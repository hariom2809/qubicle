import Input from "../../../components/ui/Input"

export default function ProjectFormFields ({ formData, handleChange }) {

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                    label="Project Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g Jira"
                    required
                />

                <Input 
                    label="Project Key"
                    name="key"
                    value={formData.key}
                    onChange={handleChange}
                    placeholder="e.g JIRA"
                    required
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-foreground">
                    Description
                </label>

                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    placeholder="What is this project about?"
                    className="
                                w-full min-h-[140px] px-4 py-2.5
                                rounded-xl border border-border bg-background
                                text-sm text-foreground placeholder:text-text-muted
                                transition-all duration-200
                                focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                />
            </div>
        </>
    )
}