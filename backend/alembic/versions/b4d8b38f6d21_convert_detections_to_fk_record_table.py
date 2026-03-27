"""Convert detections into a foreign-key-based record table

Revision ID: b4d8b38f6d21
Revises: 901efdcb744e
Create Date: 2026-03-27 19:10:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'b4d8b38f6d21'
down_revision: Union[str, Sequence[str], None] = '901efdcb744e'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('detections', sa.Column('disease_id', sa.Integer(), nullable=True))
    op.add_column('detections', sa.Column('remedy_id', sa.Integer(), nullable=True))
    op.add_column('detections', sa.Column('scheme_id', sa.Integer(), nullable=True))

    op.create_index(op.f('ix_detections_disease_id'), 'detections', ['disease_id'], unique=False)
    op.create_index(op.f('ix_detections_remedy_id'), 'detections', ['remedy_id'], unique=False)
    op.create_index(op.f('ix_detections_scheme_id'), 'detections', ['scheme_id'], unique=False)

    conn = op.get_bind()

    conn.execute(sa.text("""
        INSERT INTO diseases (name, crop_type)
        SELECT DISTINCT d.disease_name, 'Unknown'
        FROM detections d
        LEFT JOIN diseases existing_disease ON existing_disease.name = d.disease_name
        WHERE existing_disease.id IS NULL
          AND d.disease_name IS NOT NULL
          AND btrim(d.disease_name) <> '';
    """))

    conn.execute(sa.text("""
        UPDATE detections det
        SET disease_id = dis.id
        FROM diseases dis
        WHERE det.disease_name = dis.name;
    """))

    conn.execute(sa.text("""
        INSERT INTO remedies (disease_id, type, description)
        SELECT DISTINCT det.disease_id, 'General', det.remedy
        FROM detections det
        LEFT JOIN remedies rem
          ON rem.disease_id = det.disease_id
         AND rem.description = det.remedy
        WHERE det.disease_id IS NOT NULL
          AND det.remedy IS NOT NULL
          AND btrim(det.remedy) <> ''
          AND rem.id IS NULL;
    """))

    conn.execute(sa.text("""
        UPDATE detections det
        SET remedy_id = rem.id
        FROM remedies rem
        WHERE det.disease_id = rem.disease_id
          AND det.remedy = rem.description;
    """))

    op.alter_column('detections', 'disease_id', nullable=False)

    op.create_foreign_key(
        'fk_detections_disease_id_diseases',
        'detections', 'diseases',
        ['disease_id'], ['id'],
        ondelete='RESTRICT',
    )
    op.create_foreign_key(
        'fk_detections_remedy_id_remedies',
        'detections', 'remedies',
        ['remedy_id'], ['id'],
        ondelete='SET NULL',
    )
    op.create_foreign_key(
        'fk_detections_scheme_id_schemes',
        'detections', 'schemes',
        ['scheme_id'], ['id'],
        ondelete='SET NULL',
    )

    op.drop_column('detections', 'remedy')
    op.drop_column('detections', 'disease_name')


def downgrade() -> None:
    op.add_column('detections', sa.Column('disease_name', sa.String(), nullable=True))
    op.add_column('detections', sa.Column('remedy', sa.String(), nullable=True))

    conn = op.get_bind()

    conn.execute(sa.text("""
        UPDATE detections det
        SET disease_name = dis.name
        FROM diseases dis
        WHERE det.disease_id = dis.id;
    """))

    conn.execute(sa.text("""
        UPDATE detections det
        SET remedy = rem.description
        FROM remedies rem
        WHERE det.remedy_id = rem.id;
    """))

    op.drop_constraint('fk_detections_scheme_id_schemes', 'detections', type_='foreignkey')
    op.drop_constraint('fk_detections_remedy_id_remedies', 'detections', type_='foreignkey')
    op.drop_constraint('fk_detections_disease_id_diseases', 'detections', type_='foreignkey')

    op.drop_index(op.f('ix_detections_scheme_id'), table_name='detections')
    op.drop_index(op.f('ix_detections_remedy_id'), table_name='detections')
    op.drop_index(op.f('ix_detections_disease_id'), table_name='detections')

    op.drop_column('detections', 'scheme_id')
    op.drop_column('detections', 'remedy_id')
    op.drop_column('detections', 'disease_id')

    op.alter_column('detections', 'disease_name', nullable=False)
