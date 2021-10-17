function solution(n, edge) {
    var answer = 0;
    var visited = new Array(n+1);
    var level = new Array(n+1);
    var queue = [1];
    level[0] = 0;
    level[1] = 0;
    visited[1] = true;
    var lev;
    while (queue.length) {
        var node = queue.shift();
        lev = level[node]+1;
        console.log( "여기가 while 문 쪽 :: ", node, lev, level[node]);
        for (var ed of edge) {
            //console.log(ed[0],node, visited[ed[1]], ed[1]);
            if (ed[0]==node && visited[ed[1]]==undefined) {
                queue.push(ed[1]);
                visited[ed[1]] = true;
                level[ed[1]] = lev;
            } else if (ed[1]==node && visited[ed[0]] == undefined){
                queue.push(ed[0]);
                visited[ed[0]] = true;
                level[ed[0]] = lev;
            }
        }
    }
    answer = level.filter((i)=>i==lev-1).length;
    return answer;
}