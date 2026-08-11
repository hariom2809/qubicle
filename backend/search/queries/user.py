from search.documents.user import UserDocument


def search_users(query):
    search = UserDocument.search()

    search = search.query(
        "multi_match",
        query=query,
        fields=[
            "name",
            "email",
            "first_name",
            "last_name",
        ],
    )

    return search.execute()