import { STATUS_OPTIONS } from '../data';

export default function ProjectItem({ project, onDelete, onEdit, onStatusChange }) {
  return (
    <article className="project-item">
      <header className="project-item-header">
        <h4>{project.name}</h4>
        <span className={`priority-chip priority-${project.priority}`}>{project.priority}</span>
      </header>

      <p className="meta">
        마감일: {project.deadline || '미정'} · 상태: {project.status}
      </p>

      {project.memo && <p className="memo">{project.memo}</p>}

      <div className="status-buttons">
        {STATUS_OPTIONS.map((status) => (
          <button
            key={status}
            type="button"
            className={status === project.status ? 'status-btn active' : 'status-btn'}
            onClick={() => onStatusChange(project.id, status)}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="item-actions">
        <button type="button" className="secondary-btn" onClick={() => onEdit(project)}>
          수정
        </button>
        <button type="button" className="danger-btn" onClick={() => onDelete(project.id)}>
          삭제
        </button>
      </div>
    </article>
  );
}
