import NumberFormat from 'react-number-format'

//Adds commas between numbers to signify thousands, 100000000 -> 100,000,000
export function FormatNums (array, prop, prop2) {
    return array.map(item =>{
        const object = Object.assign({}, item)
        object[prop] = <NumberFormat value={object[prop]} displayType={'text'} thousandSeparator={true} />
        if(prop2 != null){
            object[prop2] = <NumberFormat value={object[prop2]} displayType={'text'} thousandSeparator={true} />
        }
        return object
    })
}
