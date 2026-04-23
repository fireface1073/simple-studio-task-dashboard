const STORAGE_KEY = 'studio-projects-v1';

// localStorage에서 데이터를 읽고, 실패 시 빈 배열로 복구합니다.
export function loadProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('저장된 프로젝트를 읽는 중 오류가 발생했습니다.', error);
    return [];
  }
}

// 프로젝트 데이터를 문자열로 저장합니다.
export function saveProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

// YYYY-MM-DD 형태의 오늘 날짜를 반환합니다.
export function getTodayISODate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// 오늘 할 일 조건: 마감일이 오늘이거나, 상태가 작업중.
export function isTodayTask(project, today) {
  return project.status === '작업중' || project.deadline === today;
}
