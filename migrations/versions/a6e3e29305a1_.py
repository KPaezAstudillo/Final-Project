"""empty message

Revision ID: a6e3e29305a1
Revises: 
Create Date: 2022-10-28 03:44:27.975818

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a6e3e29305a1'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('createtrips', 'country_trip',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=50),
               existing_nullable=False)
    op.alter_column('createtrips', 'capital_trip',
               existing_type=sa.INTEGER(),
               type_=sa.String(length=50),
               existing_nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('createtrips', 'capital_trip',
               existing_type=sa.String(length=50),
               type_=sa.INTEGER(),
               existing_nullable=False)
    op.alter_column('createtrips', 'country_trip',
               existing_type=sa.String(length=50),
               type_=sa.INTEGER(),
               existing_nullable=False)
    # ### end Alembic commands ###
