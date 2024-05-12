const fileSystem = require('fs')

// reading files

fileSystem.readFile('./docs/blog1.txt', (error, data) => {
    if (error) {
        console.log(error)
    }
    console.log(data.toString())
});

console.log('Hello From Last Line')

// writing files

fileSystem.writeFile('./docs/blog1.txt', 'Hello All..!! How Are You..??', () => {
    console.log('File Was Written')
})

fileSystem.readFile('./docs/blog1.txt', (error, data) => {
    if (error) {
        console.log(error)
    }
    console.log(data.toString())
});

// directories 

if (!fileSystem.existsSync('./assets')) {
    fileSystem.mkdir('./assets', (error) => {
        if (error) {
            console.log(error)
        }
        console.log('Folder Created')
    })
} else {
    fileSystem.rmdir('./assets', (error) => {
        if (error) {
            console.log(error)
        }
        console.log('Folder Removed')
    })
}
