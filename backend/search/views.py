from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from search.queries.user import search_users
from search.serializers import UserSearchSerializer

class UserSearchView(APIView):

    def get(self, request):

        query = request.query_params.get("q", "").strip()

        if not query:
            return Response(
                {
                    "detail": "Search query is required."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        results = search_users(query)

        data = [
            {
                "id": hit.id,
                "name": hit.name,
                "email": hit.email,
                "first_name": hit.first_name,
                "last_name": hit.last_name,
            }
            for hit in results
        ]

        serializer = UserSearchSerializer(data, many=True)

        return Response(serializer.data)