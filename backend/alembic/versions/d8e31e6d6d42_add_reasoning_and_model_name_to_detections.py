"""Add reasoning and model name to detections

Revision ID: d8e31e6d6d42
Revises: b4d8b38f6d21
Create Date: 2026-03-27 20:05:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd8e31e6d6d42'
down_revision: Union[str, Sequence[str], None] = 'b4d8b38f6d21'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column('detections', sa.Column('reasoning', sa.Text(), nullable=True))
    op.add_column('detections', sa.Column('model_name_used', sa.String(), nullable=True))


def downgrade() -> None:
    op.drop_column('detections', 'model_name_used')
    op.drop_column('detections', 'reasoning')
