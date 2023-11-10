(async () => {
    const reconRaccoon = require('../index')

    const usernameResults = await reconRaccoon.username(['notreeceharris', 'zeno_echozz'])

    for (let i = 0; i < usernameResults.length; i++) {
        const username = usernameResults[i];
        const positiveResults = username.filter(result => result.active)

        positiveResults.forEach(result => {
            console.log(`[+] ${result.urlMain} is active! (${result.url})`)
        })

        if (positiveResults.length === 0) {
            console.log(`[-] ${username[0].username} is not active.`)
        }
        
    }

})();