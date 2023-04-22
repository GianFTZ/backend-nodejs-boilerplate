type Parameter = {
    name: string
    age: number
}

function main(param: Parameter) {
    console.log(param)
}

main({
    name: "gian",
    age: 18
})