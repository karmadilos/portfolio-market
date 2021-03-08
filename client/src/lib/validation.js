// 이메일, 패스워드, 이름 정규식
const emailPattern = new RegExp(/[\w]*[.]?[\w]+@[\w][.]?[\w]+[.][\w]+/);
const passwordPattern = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);
const namePattern = new RegExp(/^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,50}$/);

export const ckIsValidPattern = ({ type, value }) => {
    if (type === 'email') return value.match(emailPattern) ? true : false;
    if (type === 'password') return value.match(passwordPattern) ? true : false;
    return value.match(namePattern) ? true : false;
};

// 학력 테이블에서는 학교 이름, 상태 => 필수
// 수상 테이블에서는 수상 명칭 => 필수
// 프로젝트 테이블에서는 프로젝트 명칭 => 필수, 시작날짜 <= 종료날짜 이어야함
// 자격증 테이블에서는 자격증 명칭 => 필수

// 프로필 이름은 위의 namePattern과 동일하게 적용
// img는 jpg, jpeg, png만 가능 => 시간 되면 삭제까지 구현
// 코멘트는 null 가능 => 기본값이 한 줄 소개

// 검색창에는 딱히 validation 적용 안하고, 2글자 미만에서는 검색이 안되도록 구현
