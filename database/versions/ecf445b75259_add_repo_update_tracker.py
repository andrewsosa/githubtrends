"""Add repo update tracker

Revision ID: ecf445b75259
Revises: 2d5e3b84ad11
Create Date: 2020-12-16 21:58:01.153538

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "ecf445b75259"
down_revision = "2d5e3b84ad11"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "repo_lastupdate",
        sa.Column("repo", sa.Text(), nullable=False),
        sa.Column("last_update", sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint("repo"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("repo_lastupdate")
    # ### end Alembic commands ###
