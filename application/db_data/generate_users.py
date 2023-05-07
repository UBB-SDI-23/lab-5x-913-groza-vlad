import random
import string

from faker import Faker

USERS = 10000

fake = Faker()

def generate_username(first_name, last_name):
    first = first_name.lower()
    last = last_name.lower()
    return first + random.choice(string.ascii_lowercase) + last + str(random.randint(100, 999))


def generate_user():
    first_name = fake.first_name()
    last_name = fake.last_name()
    email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 1000)}@{fake.domain_name()}"
    username = generate_username(first_name, last_name)
    return first_name, last_name, username, email


def generate_user_profile(user_id, first_name, last_name):
    bio = fake.paragraph(nb_sentences=3)
    location = fake.city()
    gender = random.choice(['Male', 'Female'])
    return "('" + first_name + "','" + last_name + "','" + bio + "','" + location + "','" + gender + "'," + str(user_id) + ")"


def create_users():
    users_file = open('insert_users.sql', 'w')
    users_profile_file = open('insert_users_profiles.sql', 'w')

    password = 'qWv6W+PNt3AaFNhbm8wI5RE9Uvnz_3uT'
    user_nr = 0
    insert_user = 'INSERT INTO auth_user (username, email, password, is_active, is_staff, is_superuser, first_name, last_name, date_joined) VALUES '
    insert_user_profile = 'INSERT INTO players_userprofile (first_name, last_name, bio, location, gender, user_id) VALUES '
    usernames = {}
    emails = {}
    for u_id in range(3, USERS + 1):
        if user_nr != 0:
            insert_user += ","
            insert_user_profile += ","

        first_name, last_name, username, email = generate_user()
        if usernames.get(username) is not None:
            usernames[username] += 1
            username = username + str(usernames[username])
        else:
            usernames[username] = 1
        if emails.get(email) is not None:
            emails[email] += 1
            email = email.split('@')[0] + emails[email] + email.split('@')[1]
        user = "('" + username + "','" + email + "','" + password + "', true, false, false, '', '', '2023-05-07 16:10:54')"
        user_profile = generate_user_profile(u_id, first_name, last_name)

        insert_user += user
        insert_user_profile += user_profile
        user_nr += 1

        if user_nr > 500:
            user_nr = 0
            users_file.write(insert_user + ";\n")
            users_profile_file.write(insert_user_profile + ";\n")
            insert_user = 'INSERT INTO auth_user (username, email, password, is_active, is_staff, is_superuser, first_name, last_name, date_joined) VALUES '
            insert_user_profile = 'INSERT INTO players_userprofile (first_name, last_name, bio, location, gender, user_id) VALUES '

    if user_nr != 0:
        users_file.write(insert_user + ";\n")
        users_profile_file.write(insert_user_profile + ";\n")
    users_file.close()
    users_profile_file.close()


if __name__ == '__main__':
    create_users()
