type Parameter = {
    name: string
    age: number
}

async function main(param: Parameter) {
    console.log(param)
    console.log(process.env.PORT)
}

main({
    name: "gian",
    age: 18
})