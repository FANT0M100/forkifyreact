

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if(title.length > 17) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        return `${newTitle.join(' ')}...`
    }
    return title;
}


export const parseIngredients = ( ingredients ) => {
    const newIngredients = ingredients.map(el => {
        const unitLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups'];
        const unitShorts = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup'];
        const units =[...unitShorts, 'kg', 'g', 'pound'];

        // 1. uniform unit
        let ingredient = el.toLowerCase();
        unitLong.forEach((unit, i) => {
            ingredient = ingredient.replace(unit, unitShorts[i]);
        });

        // 2. remove paranethses (frchxilebi)
        ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

        // 3. parse ingredients into cound, unit and ingredients
        // 1/2 tsp salt => ['1/2', 'tsp', 'salt'] 
        const arrIng = ingredient.split(' ');
        const unitIndex = arrIng.findIndex(value => units.includes(value));

        let objIng;
        if(unitIndex > -1) {
            // there is a unit
            // ex: 4 1/2; ['4', '1/2'] => 4.5
            // ex: 4; ['4'] => 4
            // ex: 1/2; ['1/2'] => 0.5
            const arrCount = arrIng.slice(0, unitIndex);
            let count;
            if(arrCount.length === 1){
                count = eval(arrIng[0]);
            }else {
                count = eval(arrCount.join('+')); // ['4', '1/2'] => '4 + 1/2'
            }
            objIng = {
                count, //count: count;
                unit: arrIng[unitIndex],
                ingredient: arrIng.slice(unitIndex + 1).join(' ')
            }
        }else if(parseInt(arrIng[0], 10)){
            // there is No unit, but number
            objIng = {
                count: +arrIng[0],
                unit: '',
                ingredient: arrIng.slice(1).join(' ')
            }
        }else if(unitIndex === -1){
            //there is not unit
            objIng = {
                count: 1,
                unit: '',
                ingredient
            }
        }

        return objIng;
    })
    return newIngredients;
}