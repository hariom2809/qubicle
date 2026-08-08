import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { useProject } from "../hooks/useProject"
import Button from "../../../components/ui/Button"
import Header from "../../../components/layout/Header"
import PageContainer from "../../../components/ui/PageContainer"
import ProjectGrid from "../components/ProjectGrid"
import ProjectCreateModal from "../components/ProjectCreateModal"

export default function Dashboard() {
    
    const navigate = useNavigate()

    const query = useProject()
    const [showProjectForm, setShowProjectForm] = useState(false)

    if (query.isLoading) {
      return (
        <div className="flex h-full items-center justify-center text-sm text-text-muted">
          Loading projects…
        </div>
      )
    }

    return (
      <PageContainer>
        <Header
          title="Projects"
          subtitle="Manage and track all of your team's projects"
          actions={
            <Button
              onClick={() => setShowProjectForm(true)}
            >
              + Create Project
            </Button>
          }
        />

        <ProjectCreateModal 
          isOpen={showProjectForm}
          onClose={() => setShowProjectForm(false)}
        />

        <ProjectGrid
          projects={query.data?.results || []}
          onProjectClick={(id) => navigate(`/project/${id}`)}
        />

      </PageContainer>
    )
}