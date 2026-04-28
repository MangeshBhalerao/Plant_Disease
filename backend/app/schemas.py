
from pydantic import BaseModel, EmailStr 
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    phone_number: Optional[str] = None
    location: Optional[str] = None
    password: str
    


class UserOut(BaseModel):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[str] = None



class SchemeBase(BaseModel):
    name : str
    description : str
    link : str
    image_url :Optional[str] = None


class SchemeCreate(SchemeBase):
    pass


class SchemeOut(SchemeBase):
    id : int

    class Config:
        from_attributes = True



# --- REMEDY SCHEMAS ---
class RemedyBase(BaseModel):
    type: str
    description: str

class RemedyCreate(RemedyBase):
    pass

class RemedyResponse(RemedyBase):
    id: int
    class Config:
        from_attributes = True

# --- DISEASE SCHEMAS ---
class DiseaseBase(BaseModel):
    name: str
    crop_type: str

class DiseaseCreate(DiseaseBase):
    # When creating a disease, we can verify remedies immediately if we want
    pass 

class DiseaseResponse(DiseaseBase):
    id: int
    remedies: list[RemedyResponse] = [] # Nested list of cures

    class Config:
        from_attributes = True


# Add this class
class DetectionResponse(BaseModel):
    disease: str
    confidence: float
    remedy: str
    image_path: str
    reasoning: str


class DetectionHistoryResponse(BaseModel):
    id: int
    disease_name: str
    confidence: Optional[float] = None
    remedy: Optional[str] = None
    image_path: str
    reasoning: Optional[str] = None
    model_name_used: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True


class NearbyStore(BaseModel):
    name: str
    address: str
    google_maps_url: Optional[str] = None
    phone_number: Optional[str] = None
    website_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    distance_meters: Optional[int] = None
    rating: Optional[float] = None
    user_rating_count: Optional[int] = None
    types: list[str] = []


class NearbyStoreSearchRequest(BaseModel):
    latitude: float
    longitude: float
    disease_name: str
    remedy: Optional[str] = None


class NearbyStoreSearchResponse(BaseModel):
    configured: bool
    query: Optional[str] = None
    message: Optional[str] = None
    stores: list[NearbyStore] = []


class NewsHeadline(BaseModel):
    title: str
    url: str


class NewsTickerResponse(BaseModel):
    headlines: list[NewsHeadline]
    source: str
    live: bool
