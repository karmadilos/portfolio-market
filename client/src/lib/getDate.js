// 출력 날짜 변환기
export const getDate = (date) => {
    return `${date.getFullYear()}년 ${
        date.getMonth() + 1
    }월 ${date.getDate()}일`;
};
