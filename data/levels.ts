export const LEVELS = [
    {
        level: 1,
        level_image: '/images/level_header/Mouse_Level1.png',
        slots: [{answer: 'Grass'}, {answer: 'Grasshopper'}, {answer: 'Mouse'}, {answer: 'Snake'}, {answer: 'Hawk'}],
        items: ['Grass', 'Grasshopper', 'Mouse', 'Snake', 'Hawk'],
        layout: 'vertical',
        hintText: ''
    },
    {
        level: 2,
        level_image: '/images/level_header/Fish_Level2.png',
        slots: [{answer: 'WaterGrass'}, {answer: 'Tadpole'}, {answer: 'Fish'}, {answer: 'Turtle'}, {answer: 'Raccoon'}],
        items: ['WaterGrass', 'Tadpole', 'Fish', 'Turtle', 'Raccoon'],
        layout: 'vertical',
        hintText: ''
    },
    {
        level: 3,
        level_image: '/images/level_header/MountainLion_Level3.png',
        slots: [
            {answer: 'Grass'}, 
            {group: ['Grasshopper', 'PrairieDog', 'Rabbit'], position: 'center'},
            {answer: 'Fox'}, 
            {answer: 'Coyote'}, 
            {answer: 'MountainLion'}
        ],
        items: ['Grass', 'Grasshopper', 'PrairieDog', 'Rabbit', 'Fox', 'Coyote', 'MountainLion'],
        layout: 'branch',
        hintText: 'Some spots are grouped - these show where multiple animals can fit, because they play the same role in the food chain'
    },
    {
        level: 4,
        level_image: '/images/level_header/Hawk_Level4.png',
        slots: [
            {answer: 'Grass'}, 
            {group: ['Mouse', 'Rabbit'], position: 'right'},
            {answer: 'Snake'}, 
            {group: ['Bobcat', 'Hawk'], position: 'left'},
            {answer: 'MountainLion'}
        ],
        items: ['Grass', 'Mouse', 'Rabbit', 'Snake', 'Bobcat', 'Hawk', 'MountainLion'],
        layout: 'branch',
        hintText: 'Some spots are grouped - these show where multiple animals can fit, because they play the same role in the food chain'
    },
    {
        level: 5,
        level_image: '/images/level_header/Snake_Level5.png',
        slots: [
            {answer: 'WaterGrass'}, 
            {group: ['Tadpole', 'Minnow', 'Mouse'], position: 'center'},
            {answer: 'Snake'}, 
            {group: ['Heron', 'RoadRunner'], position: 'right'},
            {answer: 'BaldEagle'}
        ],
        items: ['WaterGrass', 'Tadpole', 'Minnow', 'Mouse', 'Snake', 'Heron', 'RoadRunner', 'BaldEagle'],
        layout: 'branch',
        hintText: 'Some spots are grouped - these show where multiple animals can fit, because they play the same role in the food chain'
    },
    {
        level: 6,
        level_image: '/images/level_header/Opossum_Level6.png',
        slots: [{answer: ['Grass', 'Weeds']}, {answer: ['Grasshopper', 'Mouse']}, {answer: ['Bird', 'Rat']}, {answer: ['Snake', 'Opossum']}, {answer: ['Coyote', 'Hawk']}],
        items: [['Grass', 'Weeds'], ['Grasshopper', 'Mouse'], ['Bird', 'Rat'], ['Snake', 'Opossum'], ['Coyote', 'Hawk']],
        layout: 'or-group',
        hintText: "Each spot has two correct choices - pick the one you like best! There isn't just one food chain in the nature - there are many paths energy can take. But remember: your choice must go in the correct step in the chain!"
    }
]

export const ANIMALS = [
    'BaldEagle', 'Bird', 'Bobcat', 'Coyote', 'Fish', 'Fox', 'Grass', 'Grasshopper', 'Hawk', 'Heron', 'Minnow', 'MountainLion', 'Mouse', 'Opossum', 'PrairieDog', 'Rabbit', 'Raccoon', 'Rat', 'RoadRunner', 'Snake', 'Tadpole', 'Turtle', 'WaterGrass', 'Weeds'
]