const sequelize = require('../db')
const {DataTypes} =require('sequelize')


const News = sequelize.define('news_news',{
    id: {type: DataTypes.INTEGER(11), primaryKey:true, allowNull: false, autoIncrement: true},
    create_date: {type: 'TIMESTAMP',
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false},
    publicated: {type: DataTypes.INTEGER(1), allowNull: false},
    avatar_img_name: {type: DataTypes.STRING(100), allowNull: false},
    lang: {type: DataTypes.STRING(2), allowNull:false},
    title: {type: DataTypes.STRING(512), allowNull:false},
    teaser: {type: DataTypes.STRING(1024), allowNull:false},
    content: {type: DataTypes.STRING(40000), allowNull:false},
    order: {type: DataTypes.STRING(45), allowNull: false, defaultValue: '0'},
    show_avatar: {type: DataTypes.INTEGER(1), defaultValue: 1}
},
    {
        timestamps: false,
        freezeTableName: true
    }
)
const PageContent = sequelize.define('pages_content', {
    id: {type: DataTypes.INTEGER(11), primaryKey:true, allowNull: false, autoIncrement: true}, 
    page_id: {type:DataTypes.INTEGER(11), allowNull: false}, 
    lang: {type: DataTypes.STRING(2), allowNull:false},
    title: {type: DataTypes.STRING(215), allowNull: false}, 
    meta: {type: DataTypes.STRING(215)}, 
    content: {type: DataTypes.STRING(30000), allowNull: false}
}, {
    timestamps: false,
    freezeTableName: true
})

module.exports = {
    News,
    PageContent
}

