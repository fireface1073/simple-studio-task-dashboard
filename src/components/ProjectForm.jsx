import { PRIORITY_OPTIONS, STATUS_OPTIONS } from '../data';

const initialFormState = {
  name: '',
  status: '대기',
  deadline: '',
  priority: '보통',
  memo: '',
};

export default function ProjectForm({ form, setForm, onSubmit, onCancelEdit, isEditing }) {
  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      alert('프로젝트 이름을 입력해주세요.');
      return;
    }

    onSubmit({
      ...initialFormState,
      ...form,
      name: form.name.trim(),
    });
  }

  return (
    <section className="panel">
      <h2>{isEditing ? '프로젝트 수정' : '프로젝트 추가'}</h2>

      <form className="project-form" onSubmit={handleSubmit}>
        <label>
          프로젝트 이름
          <input
            type="text"
            value={form.name}
            onChange={(event) => updateField('name', event.target.value)}
            placeholder="예: 광고 BGM 믹싱"
          />
        </label>

        <label>
          상태
          <select value={form.status} onChange={(event) => updateField('status', event.target.value)}>
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label>
          마감일
          <input
            type="date"
            value={form.deadline}
            onChange={(event) => updateField('deadline', event.target.value)}
          />
        </label>

        <label>
          우선순위
          <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>
            {PRIORITY_OPTIONS.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label>
          메모
          <textarea
            rows="4"
            value={form.memo}
            onChange={(event) => updateField('memo', event.target.value)}
            placeholder="작업 요청 사항, 레퍼런스 링크 등을 기록하세요"
          />
        </label>

        <div className="form-actions">
          <button type="submit" className="primary-btn">
            {isEditing ? '수정 저장' : '프로젝트 추가'}
          </button>

          {isEditing && (
            <button type="button" className="secondary-btn" onClick={onCancelEdit}>
              수정 취소
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
