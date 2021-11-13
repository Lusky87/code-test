// 문제 설명
// n개의 송전탑이 전선을 통해 하나의 트리 형태로 연결되어 있습니다. 당신은 이 전선들 중 하나를 끊어서 현재의 전력망 네트워크를 2개로 분할하려고 합니다. 이때, 두 전력망이 갖게 되는 송전탑의 개수를 최대한 비슷하게 맞추고자 합니다.

// 송전탑의 개수 n, 그리고 전선 정보 wires가 매개변수로 주어집니다. 전선들 중 하나를 끊어서 송전탑 개수가 가능한 비슷하도록 두 전력망으로 나누었을 때, 두 전력망이 가지고 있는 송전탑 개수의 차이(절대값)를 return 하도록 solution 함수를 완성해주세요.

// 제한사항
// n은 2 이상 100 이하인 자연수입니다.
// wires는 길이가 n-1인 정수형 2차원 배열입니다.
// wires의 각 원소는 [v1, v2] 2개의 자연수로 이루어져 있으며, 이는 전력망의 v1번 송전탑과 v2번 송전탑이 전선으로 연결되어 있다는 것을 의미합니다.
// 1 ≤ v1 < v2 ≤ n 입니다.
// 전력망 네트워크가 하나의 트리 형태가 아닌 경우는 입력으로 주어지지 않습니다.
// 입출력 예
// n	wires	result
// 9	[[1,3],[2,3],[3,4],[4,5],[4,6],[4,7],[7,8],[7,9]]	3
// 4	[[1,2],[2,3],[3,4]]	0
// 7	[[1,2],[2,7],[3,7],[3,4],[4,5],[6,7]]	1
// 입출력 예 설명
// 입출력 예 #1

// 다음 그림은 주어진 입력을 해결하는 방법 중 하나를 나타낸 것입니다.
// ex1.png
// 4번과 7번을 연결하는 전선을 끊으면 두 전력망은 각 6개와 3개의 송전탑을 가지며, 이보다 더 비슷한 개수로 전력망을 나눌 수 없습니다.
// 또 다른 방법으로는 3번과 4번을 연결하는 전선을 끊어도 최선의 정답을 도출할 수 있습니다.
// 입출력 예 #2

// 다음 그림은 주어진 입력을 해결하는 방법을 나타낸 것입니다.
// ex2.png
// 2번과 3번을 연결하는 전선을 끊으면 두 전력망이 모두 2개의 송전탑을 가지게 되며, 이 방법이 최선입니다.
// 입출력 예 #3

// 다음 그림은 주어진 입력을 해결하는 방법을 나타낸 것입니다.
// ex3.png
// 3번과 7번을 연결하는 전선을 끊으면 두 전력망이 각각 4개와 3개의 송전탑을 가지게 되며, 이 방법이 최선입니다.

function solution(n, wires) {
    const adjArr = [...Array(n + 1)].map(() => [...Array(n + 1)].map(() => 0));
    const visit = Array(n + 1).fill(0);
    let count = 0;
    // 계획1 - 인접 배열 초기화
    wires.forEach(([v1, v2]) => {
        adjArr[v1][v2] = 1;
        adjArr[v2][v1] = 1;
    });
    console.log(adjArr);
    // 순회
    // 계획2 - 전선을 하나씩 다 끊어보며 순회합니다.
    const dfs = (tower) => {
        visit[tower] = 1;
        count++;
        console.log("count : ",count);
        console.log("tower : ",tower);
        for (let i = 1; i <= n; i++) {
            adjArr[tower][i] && !visit[i] && dfs(i);
        }
    };

    return wires.reduce((m, [v1, v2]) => {
        // 전선 끊기
        adjArr[v1][v2] = 0;
        adjArr[v2][v1] = 0;
        // 순회
        dfs(1);
        // 전선 회복
        adjArr[v1][v2] = 1;
        adjArr[v2][v1] = 1;

        m = Math.min(m, Math.abs(n - 2 * count)); // 송전탑 개수의 차이의 최솟값 갱신
        visit.forEach((_, i) => visit[i] = 0); // 방문 배열 초기화
        count = 0; // 개수 초기화

        return m;
    }, n);
// 하나의 연결된 전력망만 순회하며 통신탑의 개수만 새면
// 다른 하나의 전력망의 통신탑의 개수를 알 수 있습니다.

// 현재 전력망을 순회하면서 카운팅한 통신탑의 개수를 count라 했을 때,
// 다른 전력망의 통신탑의 개수는 n - count가 됩니다.
// 이 둘의 통신탑 개수의 차이는 n - count - count가 되고
// 절댓값을 취해야하니 Math.abs(n - 2 * count) 코드가 들어가게 됩니다.
}