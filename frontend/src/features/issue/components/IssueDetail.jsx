import Card from "../../../components/ui/Card"
import IssueHeader from "./IssueHeader"

export default function IssueDetail({ issue }) {

    return (
        <Card>
            <IssueHeader 
                title={issue.title}
                description={issue.description}
            />
        </Card>
    )
}