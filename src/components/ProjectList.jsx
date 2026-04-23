import ProjectItem from './ProjectItem';

export default function ProjectList({ title, projects, emptyText, handlers }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {projects.length === 0 ? (
        <p className="empty">{emptyText}</p>
      ) : (
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onDelete={handlers.onDelete}
              onEdit={handlers.onEdit}
              onStatusChange={handlers.onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}
