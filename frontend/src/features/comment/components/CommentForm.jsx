import { useState } from "react"
import { usePostComment } from "../hooks/usePostComment"
import Input from "../../../components/ui/Input"
import Button from "../../../components/ui/Button"

export default function CommentForm({ issueId }) {

    const [body, setBody] = useState("")
    const { mutate, isPending } = usePostComment()

    const handleSubmit = () => {
        if (!body.trim()) return

        mutate({
            issueId,
            body
        },
        {
            onSuccess: () => { setBody("") }
        })
    }

    return (
        <div className="flex items-start gap-3">
            <div className="flex-1">
                <Input
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                    placeholder="Add a comment…"
                />
            </div>

            <Button
                onClick={handleSubmit}
                disabled={isPending || !body.trim()}
            >
                {isPending ? "Posting…" : "Post"}
            </Button>
        </div>
    )
}
