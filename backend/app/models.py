from datetime import datetime

from sqlalchemy import Column, DateTime, Float, ForeignKey, Integer, String, Text, TIMESTAMP
from sqlalchemy.orm import relationship

from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    phone_number = Column(String, unique=True, nullable=True)
    location = Column(String, nullable=True)
    created_at = Column(TIMESTAMP(timezone=True),
                        nullable=False, server_default="now()")
    

    detections = relationship("Detection", back_populates="owner")


class Detection(Base):
    __tablename__ = "detections"

    id = Column(Integer, primary_key=True, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    disease_id = Column(Integer, ForeignKey("diseases.id", ondelete="RESTRICT"), nullable=False)
    remedy_id = Column(Integer, ForeignKey("remedies.id", ondelete="SET NULL"), nullable=True)
    scheme_id = Column(Integer, ForeignKey("schemes.id", ondelete="SET NULL"), nullable=True)
    image_path = Column(Text, nullable=False)
    confidence = Column(Float)
    reasoning = Column(Text, nullable=True)
    model_name_used = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="detections")
    disease = relationship("Disease", back_populates="detections")
    remedy_entry = relationship("Remedy", back_populates="detections")
    scheme = relationship("Scheme", back_populates="detections")

    @property
    def disease_name(self):
        return self.disease.name if self.disease else None

    @property
    def remedy(self):
        return self.remedy_entry.description if self.remedy_entry else None



class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)           # e.g., "PM-KISAN"
    description = Column(String, nullable=False)    # e.g., "Get Rs 6000 per year..."
    link = Column(String, nullable=False)           # e.g., "https://pmkisan.gov.in"
    image_url = Column(String, nullable=True)       # Optional logo/image

    detections = relationship("Detection", back_populates="scheme")



class Disease(Base):
    __tablename__ = "diseases"

    id = Column(Integer, primary_key=True , index = True)
    name = Column(String , unique=True , nullable=False)
    crop_type = Column(String , nullable=False)

    remedies = relationship("Remedy", back_populates="disease")
    detections = relationship("Detection", back_populates="disease")


class Remedy(Base):
    __tablename__ = "remedies"

    id = Column(Integer, primary_key=True, index=True)
    disease_id = Column(Integer, ForeignKey("diseases.id"))
    type = Column(String, nullable=False)       
    description = Column(String, nullable=False)

    disease = relationship("Disease", back_populates="remedies")
    detections = relationship("Detection", back_populates="remedy_entry")



                
