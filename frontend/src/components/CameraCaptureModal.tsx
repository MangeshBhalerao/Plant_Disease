import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Camera, RefreshCcw, X } from 'lucide-react';

interface CameraCaptureModalProps {
  open: boolean;
  isSubmitting?: boolean;
  onClose: () => void;
  onCapture: (file: File) => Promise<void> | void;
}

export const CameraCaptureModal = ({
  open,
  isSubmitting = false,
  onClose,
  onCapture,
}: CameraCaptureModalProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isPreparingCamera, setIsPreparingCamera] = useState(false);

  const attachStream = async (stream: MediaStream) => {
    streamRef.current = stream;

    const [videoTrack] = stream.getVideoTracks();
    const capabilities = videoTrack?.getCapabilities?.() as
      | (MediaTrackCapabilities & { zoom?: { min?: number; max?: number } })
      | undefined;

    if (videoTrack && capabilities?.zoom?.min !== undefined && capabilities?.zoom?.max !== undefined) {
      const normalZoom = Math.min(Math.max(1, capabilities.zoom.min), capabilities.zoom.max);
      await videoTrack.applyConstraints({
        advanced: [{ zoom: normalZoom } as MediaTrackConstraintSet],
      });
    }

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      await videoRef.current.play();
    }
  };

  const getBackCameraDeviceId = async () => {
    if (!navigator.mediaDevices?.enumerateDevices) {
      return null;
    }

    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter((device) => device.kind === 'videoinput');
    const rearCameras = videoDevices.filter((device) => /back|rear|environment/i.test(device.label));
    const normalRearCamera = rearCameras.find((device) => !/ultra|0\.5/i.test(device.label));

    return normalRearCamera?.deviceId ?? rearCameras[0]?.deviceId ?? null;
  };

  const startCameraStream = async () => {
    const firstStream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: { ideal: 'environment' },
        width: { ideal: 1280 },
        height: { ideal: 960 },
        aspectRatio: { ideal: 4 / 3 },
      },
      audio: false,
    });

    const preferredBackCameraId = await getBackCameraDeviceId();
    const [currentTrack] = firstStream.getVideoTracks();

    if (preferredBackCameraId && currentTrack?.getSettings().deviceId !== preferredBackCameraId) {
      firstStream.getTracks().forEach((track) => track.stop());
      const preferredStream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: preferredBackCameraId },
          width: { ideal: 1280 },
          height: { ideal: 960 },
          aspectRatio: { ideal: 4 / 3 },
        },
        audio: false,
      });

      await attachStream(preferredStream);
      return;
    }

    await attachStream(firstStream);
  };

  useEffect(() => {
    if (!open) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setCameraError(null);
      return;
    }

    const startCamera = async () => {
      if (!navigator.mediaDevices?.getUserMedia) {
        setCameraError('Camera access is not supported in this browser.');
        return;
      }

      setIsPreparingCamera(true);
      setCameraError(null);

      try {
        await startCameraStream();
      } catch (error) {
        console.error('Unable to access camera', error);
        setCameraError('Camera permission was denied or no camera is available.');
      } finally {
        setIsPreparingCamera(false);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [open]);

  const handleRetake = async () => {
    if (!streamRef.current) {
      return;
    }

    streamRef.current.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setCameraError(null);
    setIsPreparingCamera(true);

    try {
      await startCameraStream();
    } catch (error) {
      console.error('Unable to restart camera', error);
      setCameraError('Unable to restart the camera.');
    } finally {
      setIsPreparingCamera(false);
    }
  };

  const handleCapture = async () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;

    const context = canvas.getContext('2d');
    if (!context) {
      setCameraError('Unable to capture the image.');
      return;
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, 'image/jpeg', 0.92);
    });

    if (!blob) {
      setCameraError('Unable to prepare the captured image.');
      return;
    }

    const capturedFile = new File(
      [blob],
      `camera-capture-${Date.now()}.jpg`,
      { type: 'image/jpeg' },
    );

    await onCapture(capturedFile);
  };

  if (!open) {
    return null;
  }

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[2147483647] bg-black/50 backdrop-blur-sm px-4 py-6 flex items-center justify-center">
      <div className="w-full max-w-3xl rounded-[28px] bg-white shadow-2xl border border-white/60 overflow-hidden">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-outline-variant/60">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary">Camera Capture</p>
            <h2 className="font-headline text-xl sm:text-2xl font-bold text-on-surface">Take a leaf photo</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isSubmitting}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="relative rounded-[24px] overflow-hidden bg-surface-dim border border-outline-variant/60 min-h-[280px] sm:min-h-[420px] flex items-center justify-center">
            {cameraError ? (
              <div className="px-6 py-10 text-center">
                <p className="text-base font-semibold text-on-surface mb-2">Camera unavailable</p>
                <p className="text-sm text-on-surface-muted">{cameraError}</p>
              </div>
            ) : (
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className="w-full h-full object-cover"
              />
            )}

            {isPreparingCamera && (
              <div className="absolute text-sm font-medium text-on-surface">Preparing camera...</div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={handleCapture}
              disabled={Boolean(cameraError) || isPreparingCamera || isSubmitting}
              className="flex-1 btn-primary py-3.5 px-5 text-sm sm:text-base flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Camera className="w-4 h-4" />
              {isSubmitting ? 'Analyzing...' : 'Capture and analyze'}
            </button>

            <button
              type="button"
              onClick={handleRetake}
              disabled={isPreparingCamera || isSubmitting}
              className="flex-1 glass py-3.5 px-5 rounded-2xl text-sm sm:text-base font-semibold text-on-surface flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <RefreshCcw className="w-4 h-4" />
              Restart camera
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};
