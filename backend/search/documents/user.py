from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry

from accounts.models import User


@registry.register_document
class UserDocument(Document):

    name = fields.TextField()

    class Index:
        name = "users"

    class Django:
        model = User

        fields = [
            "id",
            "first_name",
            "last_name",
            "email",
        ]

    def prepare_name(self, instance):
        return instance.name