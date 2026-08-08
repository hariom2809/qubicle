import { ISSUE_STATUS } from "../../constants/issueStatus"

export default function StatusBadge({ status }) {

    const statusConfig = ISSUE_STATUS[status]

    if (!statusConfig) return null

    return (
        <span
            className={`
                inline-flex items-center
                px-2.5 py-0.5
                rounded-full
                text-xs font-semibold
                ${statusConfig.bgColor}
                ${statusConfig.textColor}
            `}
        >
            {statusConfig.label}
        </span>
    )
}
