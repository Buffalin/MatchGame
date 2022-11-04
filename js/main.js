const data = {
    blocks: 16,
    actives: [13, 15, 20, 21, 22, 23, 28, 30],
    maxRemoveCount: 3,
    targetIds: [14, 16, 24]
};

document.addEventListener("DOMContentLoaded", function () {
    
    const mainBlock = document.querySelector('.matches_block');

    let matchStockCount = [];
    let matchIds = [];
    let winner = false;


    function createCell(cellId) {
        const cell = document.createElement("DIV");
        cell.classList.add('matches_cell')
        const matchIds = [cellId * 2 - 1, cellId * 2];
        const matchTop = createMatch('vertical', matchIds[0])
        const matchLeft = createMatch('horizont', matchIds[1])
        cell.append(matchTop);
        cell.append(matchLeft);
        return cell
    };

    function createMatch(type, id) {
        const match = document.createElement("DIV");
        const isActive = data.actives.some(item => item == id)
        match.classList.add('match', `match_${type}${isActive ? '' : '_inactive'}`);
        match.setAttribute('id', id);
        match.setAttribute('active', isActive ? 1 : 0)
        return match
    };

    for (let i = 1; i <= data.blocks; i++) {
        mainBlock.append(createCell(i))
    };

    function matchToggle(match) {

        if (match.getAttribute('active') == 1 && matchStockCount.length < data.maxRemoveCount ) {
            matchStockCount.push(match.id);
            match.setAttribute('active', 0);
            matchIds = matchIds.filter((item) => item !== match.id)
            if (match.classList.contains('match_vertical')) {
                match.classList.replace('match_vertical', 'match_vertical_inactive')
            } else if (match.classList.contains('match_horizont')) {
                match.classList.replace('match_horizont', 'match_horizont_inactive')
            };
        } else if (match.getAttribute('active') == 0 && matchStockCount.length > 0 ) {
            match.setAttribute('active', 1);
            matchStockCount.pop()
            matchIds.push(match.id);
            if (match.classList.contains('match_vertical_inactive')) {
                match.classList.replace('match_vertical_inactive', 'match_vertical')
            } else if (match.classList.contains('match_horizont_inactive')) {
                match.classList.replace('match_horizont_inactive', 'match_horizont')
            };
        };
    };
    
    function checkResponse(targetIds, ids) {
        let result = [];
        targetIds.forEach((item) => {
            if (ids.some(id => id == item)) {
                result.push(item)
            } else {
                return
            }
        })
        if (result.length === targetIds.length) {
            alert('You are Winner')
            winner = true;
        }
    };

    mainBlock.addEventListener("click", (event) => {
        if (winner === true) {
            alert('Ты уже победитель, что тебе еще надо?')
            return
        }
        if (matchIds.length === 3) {
            alert('Game over')
            return
        } else if (event.target && event.target.classList.contains('match')) {
            matchToggle(event.target);
            checkResponse(data.targetIds, matchIds)
        } else return;
    });

});
