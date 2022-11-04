const data = {
    blocks: 16,
    actives: [13, 15, 20, 21, 22, 23, 28, 30],
    moveMatches: [20, 28, 30],
    targetIds: [14, 16, 24]
};

document.addEventListener("DOMContentLoaded", function () {
    
    const mainBlock = document.querySelector('.matches_block');

    let takedMatchIds = [];
    let placedMatchIds = [];
    let winner;

    function createMatch(type, id) {
        const match = document.createElement("DIV");
        const isActive = data.actives.some(item => item == id)
        match.classList.add('match', `match_${type}${isActive ? '' : '_inactive'}`);
        match.setAttribute('id', id);
        match.setAttribute('active', isActive ? 1 : 0)
        return match
    };

    function createCell(cellId) {
        const cell = document.createElement("DIV");
        cell.classList.add('matches_cell')
        const matchIds = [cellId * 2 - 1, cellId * 2];
        const matchVertical = createMatch('vertical', matchIds[0])
        const matchHorizont = createMatch('horizont', matchIds[1])
        cell.append(matchVertical);
        cell.append(matchHorizont);
        return cell
    };

    for (let i = 1; i <= data.blocks; i++) {
        mainBlock.append(createCell(i))
    };

    function setMatchActive(match) {
        if (match.classList.contains('match_vertical_inactive')) {
            match.classList.replace('match_vertical_inactive', 'match_vertical')
        } else if (match.classList.contains('match_horizont_inactive')) {
            match.classList.replace('match_horizont_inactive', 'match_horizont')
        };
    }

    function setMatchInactive(match) {
        if (match.classList.contains('match_vertical')) {
            match.classList.replace('match_vertical', 'match_vertical_inactive')
        } else if (match.classList.contains('match_horizont')) {
            match.classList.replace('match_horizont', 'match_horizont_inactive')
        };
    }

    function toggleMatch(match) {

        if (match.getAttribute('active') == 1 && takedMatchIds.length < data.targetIds.length) {
            takedMatchIds.push(match.id);
            match.setAttribute('active', 0);
            placedMatchIds = placedMatchIds.filter((item) => item !== match.id);
            setMatchInactive(match);

        } else if (match.getAttribute('active') == 0 && takedMatchIds.length > 0) {
            match.setAttribute('active', 1);
            placedMatchIds.push(match.id);
            setMatchActive(match);
        };
    };

    function matchesTakedIsCorrect() {
        let result = [];

        if (takedMatchIds.length === data.targetIds.length) {
            data.moveMatches.forEach((item) => {
                takedMatchIds.forEach((id) => {
                    if (item == id) {
                        result.push(id);
                    }
                })
            });
        }
        return result.length === data.moveMatches.length
    }
    
    function matchesPlacedIsCorrect() {
        let result = [];

        if (placedMatchIds.length === data.targetIds.length) {
            data.targetIds.forEach((item) => {
                placedMatchIds.forEach((id) => {
                    if (item == id) {
                        result.push(id)
                    }
                }); 
            })
        }
        return result.length === data.targetIds.length
    };

    mainBlock.addEventListener("click", (event) => {
        if (winner) {
            alert('Ты уже победитель, что тебе еще надо?')
            return
        } else if (event.target && event.target.classList.contains('match')) {
            toggleMatch(event.target);
            
            if (matchesTakedIsCorrect() && matchesPlacedIsCorrect()) {
                alert('Your are winner')
                winner = true
                return
            } else if (placedMatchIds.length === data.targetIds.length) {
                alert('Game over');
                winner = false;
                window.location.reload()
            }
         } 
    });
});
