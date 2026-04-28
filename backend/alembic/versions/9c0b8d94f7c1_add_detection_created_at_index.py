"""Add detection created_at index

Revision ID: 9c0b8d94f7c1
Revises: d8e31e6d6d42
Create Date: 2026-04-28 00:00:00.000000

"""

from typing import Sequence, Union

from alembic import op


# revision identifiers, used by Alembic.
revision: str = "9c0b8d94f7c1"
down_revision: Union[str, Sequence[str], None] = "d8e31e6d6d42"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index(op.f("ix_detections_created_at"), "detections", ["created_at"], unique=False)


def downgrade() -> None:
    op.drop_index(op.f("ix_detections_created_at"), table_name="detections")
