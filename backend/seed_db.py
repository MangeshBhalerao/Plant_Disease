from app.database import SessionLocal
from app import models

db = SessionLocal()

disease_name = "Wheat Rust"
# You can customize this description as needed
remedy_text = "Use sulfur-based organic fungicides. Ensure proper plant spacing to reduce humidity."

# 1. Check if disease exists
existing_disease = db.query(models.Disease).filter(models.Disease.name == disease_name).first()

if not existing_disease:
    print(f"Adding '{disease_name}'...")
    
    # Create Disease with 'crop_type'
    new_disease = models.Disease(
        name=disease_name, 
        crop_type="Wheat" 
    )
    db.add(new_disease)
    db.commit()
    db.refresh(new_disease)

    # 2. Create Remedy with 'type'
    print("Adding remedy details...")
    new_remedy = models.Remedy(
        description=remedy_text,
        disease_id=new_disease.id,
        type="Organic"  # <--- ADDED THIS FIELD (Required by your DB)
    )
    db.add(new_remedy)
    db.commit()
    
    print("✅ Success! Disease and Remedy added.")
else:
    print(f"ℹ️ '{disease_name}' already exists.")

db.close()