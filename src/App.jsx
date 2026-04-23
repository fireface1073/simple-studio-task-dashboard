import { useMemo, useState } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import { STATUS_OPTIONS } from './data';
import { getTodayISODate, isTodayTask, loadProjects, saveProjects } from './utils';

const blankForm = {
  name: '',
  status: '대기',
  deadline: '',
  priority: '보통',
  memo: '',
};

export default function App() {
  const [projects, setProjects] = useState(() => loadProjects());
  const [form, setForm] = useState(blankForm);
  const [editingId, setEditingId] = useState(null);

  const today = getTodayISODate();

  const grouped = useMemo(() => {
    const activeProjects = projects.filter((project) => project.status !== '완료');

    return {
      todayTasks: activeProjects.filter((project) => isTodayTask(project, today)),
      byStatus: STATUS_OPTIONS.filter((status) => status !== '완료').map((status) => ({
        status,
        items: activeProjects.filter((project) => project.status === status),
      })),
      archive: projects.filter((project) => project.status === '완료'),
    };
  }, [projects, today]);

  function persist(nextProjects) {
    setProjects(nextProjects);
    saveProjects(nextProjects);
  }

  function handleSubmit(nextForm) {
    if (editingId) {
      const updated = projects.map((project) =>
        project.id === editingId ? { ...project, ...nextForm } : project,
      );
      persist(updated);
      setEditingId(null);
      setForm(blankForm);
      return;
    }

    const newProject = {
      id: crypto.randomUUID(),
      ...nextForm,
      createdAt: Date.now(),
    };

    persist([newProject, ...projects]);
    setForm(blankForm);
  }

  function handleDelete(id) {
    const confirmed = window.confirm('이 프로젝트를 삭제할까요?');
    if (!confirmed) return;

    const filtered = projects.filter((project) => project.id !== id);
    persist(filtered);

    if (editingId === id) {
      setEditingId(null);
      setForm(blankForm);
    }
  }

  function handleEdit(project) {
    setEditingId(project.id);
    setForm({
      name: project.name,
      status: project.status,
      deadline: project.deadline,
      priority: project.priority,
      memo: project.memo,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleCancelEdit() {
    setEditingId(null);
    setForm(blankForm);
  }

  function handleStatusChange(id, status) {
    const updated = projects.map((project) => (project.id === id ? { ...project, status } : project));
    persist(updated);
  }

  const handlers = {
    onDelete: handleDelete,
    onEdit: handleEdit,
    onStatusChange: handleStatusChange,
  };

  return (
    <main className="app-shell">
      <header>
        <h1>🎧 스튜디오 작업 대시보드</h1>
        <p>오늘({today}) 기준으로 빠르게 작업을 관리하세요.</p>
      </header>

      <ProjectForm
        form={form}
        setForm={setForm}
        onSubmit={handleSubmit}
        onCancelEdit={handleCancelEdit}
        isEditing={Boolean(editingId)}
      />

      <ProjectList
        title="오늘 해야 할 작업"
        projects={grouped.todayTasks}
        emptyText="오늘 집중해야 할 프로젝트가 없습니다."
        handlers={handlers}
      />

      {grouped.byStatus.map((section) => (
        <ProjectList
          key={section.status}
          title={`상태: ${section.status}`}
          projects={section.items}
          emptyText="해당 상태의 프로젝트가 없습니다."
          handlers={handlers}
        />
      ))}

      <ProjectList
        title="아카이브 (완료)"
        projects={grouped.archive}
        emptyText="완료된 프로젝트가 아직 없습니다."
        handlers={handlers}
      />
    </main>
  );
}
