import { ISSUE_PRIORITY } from "../../constants/issuePriority"

export default function PriorityBadge({ priority }) {

    const priorityConfig = ISSUE_PRIORITY[priority]

    if (!priorityConfig) return null

    return (
        <span
            className={`
                inline-flex items-center
                px-2.5 py-0.5
                rounded-full
                text-xs font-semibold
                ${priorityConfig.bgColor}
                ${priorityConfig.textColor}
            `}
        >
            {priorityConfig.label}
        </span>
    )
}
