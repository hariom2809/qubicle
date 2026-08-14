from elasticsearch.dsl import Q

from search.documents.user import UserDocument

SEARCH_FIELDS = [
    "name",
    "email",
    "first_name",
    "last_name",
]


def search_users(query):
    search = UserDocument.search()

    # full token match, plus prefix match so search-as-you-type works
    search = search.query(
        Q("multi_match", query=query, fields=SEARCH_FIELDS)
        | Q("multi_match", query=query, fields=SEARCH_FIELDS, type="phrase_prefix")
    )

    return search.execute()
