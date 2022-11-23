"""empty message

<<<<<<< HEAD:migrations/versions/4ca0d72021af_.py
Revision ID: 4ca0d72021af
Revises: 
Create Date: 2022-11-23 17:54:27.602138
=======
<<<<<<<< HEAD:migrations/versions/4d98c494169a_.py
Revision ID: 4d98c494169a
Revises: 
Create Date: 2022-11-23 13:16:07.846750
========
Revision ID: 017439a72df2
Revises: 
Create Date: 2022-11-23 14:47:37.254945
>>>>>>>> 43127bf97e72a700a8f9d8814b21431bd09ef520:migrations/versions/017439a72df2_.py
>>>>>>> 3506efc883ebd5413292000ecf5da4f077d9eaec:migrations/versions/4d98c494169a_.py

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
<<<<<<< HEAD:migrations/versions/4ca0d72021af_.py
revision = '4ca0d72021af'
=======
<<<<<<<< HEAD:migrations/versions/4d98c494169a_.py
revision = '4d98c494169a'
========
revision = '017439a72df2'
>>>>>>>> 43127bf97e72a700a8f9d8814b21431bd09ef520:migrations/versions/017439a72df2_.py
>>>>>>> 3506efc883ebd5413292000ecf5da4f077d9eaec:migrations/versions/4d98c494169a_.py
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('activities',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=200), nullable=True),
    sa.Column('url_img', sa.String(length=200), nullable=True),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.Column('activity', sa.String(length=200), nullable=True),
    sa.Column('city', sa.String(length=200), nullable=True),
    sa.Column('country', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('firstname', sa.String(length=50), nullable=False),
    sa.Column('lastname', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=50), nullable=False),
    sa.Column('password', sa.String(length=200), nullable=False),
    sa.Column('birthdate', sa.String(length=50), nullable=True),
    sa.Column('gender', sa.String(length=20), nullable=True),
    sa.Column('languages', sa.String(length=20), nullable=True),
    sa.Column('countryofresidence', sa.String(length=20), nullable=True),
    sa.Column('instagram', sa.String(length=20), nullable=True),
    sa.Column('facebook', sa.String(length=20), nullable=True),
    sa.Column('twitter', sa.String(length=20), nullable=True),
    sa.Column('verified', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('facebook'),
    sa.UniqueConstraint('instagram'),
    sa.UniqueConstraint('twitter')
    )
    op.create_table('createtrips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('country_trip', sa.String(length=50), nullable=False),
    sa.Column('capital_trip', sa.String(length=50), nullable=False),
    sa.Column('start_date', sa.String(length=50), nullable=True),
    sa.Column('end_date', sa.String(length=50), nullable=True),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('galleries',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('filename', sa.String(length=200), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('matches',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.Column('match_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('mytrips',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('travelling', sa.String(length=10), nullable=False),
    sa.Column('with_children', sa.String(length=10), nullable=False),
    sa.Column('gender_specific', sa.String(length=15), nullable=False),
    sa.Column('stay', sa.String(length=50), nullable=False),
    sa.Column('budget', sa.Integer(), nullable=False),
    sa.Column('partner_age', sa.Integer(), nullable=False),
    sa.Column('activities', sa.String(length=50), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('rating',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('good_match', sa.Integer(), nullable=False),
    sa.Column('recommend', sa.Integer(), nullable=False),
    sa.Column('reason_good', sa.String(length=30), nullable=True),
    sa.Column('reason_bad', sa.String(length=30), nullable=True),
    sa.Column('experience', sa.String(length=1000), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('saveactivity',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.Column('activity_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['activity_id'], ['activities.id'], ondelete='CASCADE'),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('userpictures',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('filename', sa.String(length=200), nullable=False),
    sa.Column('users_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['users_id'], ['users.id'], ondelete='CASCADE'),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('userpictures')
    op.drop_table('saveactivity')
    op.drop_table('rating')
    op.drop_table('mytrips')
    op.drop_table('matches')
    op.drop_table('galleries')
    op.drop_table('createtrips')
    op.drop_table('users')
    op.drop_table('activities')
    # ### end Alembic commands ###
