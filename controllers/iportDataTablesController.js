const {News} = require('../models/models')
const {PageContent} = require('../models/models')
const fs = require('fs')

function importData(file_name, delete_template, reg_template){
    let elementImported = []
    const dataImport = fs.readFileSync(file_name, 'utf-8')
    let deleteDataDB = dataImport.replace(delete_template, '')
    // console.log(dataImport);
    let indexsStartOfNewElem = []
    let reg = new RegExp(reg_template, 'g')
    let getSatrtElement = deleteDataDB.match(reg)
    for(let i = 0; i< getSatrtElement.length; i++){
        indexsStartOfNewElem.push(deleteDataDB.indexOf(getSatrtElement[i]))
    }
    for(let j = 0; j < indexsStartOfNewElem.length - 1; j++){
        elementImported.push(deleteDataDB.slice(indexsStartOfNewElem[j], indexsStartOfNewElem[j + 1]))
    }
    elementImported.push(deleteDataDB.slice(indexsStartOfNewElem[indexsStartOfNewElem.length - 1],))
    return elementImported
}

class IportDataTable{
    async importDataNewsNews(req, res){
        
        let news_news 
        let id, create_date, publicated, avatar_img_name, lang, title, teaser, content, order, show_avatar
        let elements = importData('./news_news_202311021224.csv', `"id","create_date","publicated","avatar_img_name","lang","title","teaser","content","order","show_avatar"\r\n`, `[0-9]{2,5},"20[12]{1}[0-9]{1}-[01]{1}[0-9]{1}-[0-3]{1}[0-9]{1} [0-9]{2}:[0-9]{2}:[0-9]{2}.0"`)

        elements.forEach( elem => {
            id = Number(elem.match(/[0-9]{2,5},"/)[0].slice(0, -2))
            console.log(id);
            create_date = elem.match(/"20[12]{1}[0-9]{1}-[01]{1}[0-9]{1}-[0-3]{1}[0-9]{1} [0-9]{2}:[0-9]{2}:[0-9]{2}.0"/)[0].slice(1,-1)
            console.log(create_date)
            publicated = elem.match(/",[01]{1},"/)[0].slice(2,-2)
            console.log(publicated);
            let avatar = (/"[0-9]{4}[/]{1}[0-9]{1,2}[/]{1}[0-9a-z]{32}.jpg",/).test(elem) ? elem.match(/"[0-9]{4}[/]{1}[0-9]{1,2}[/]{1}[0-9a-z]{32}.jpg",/) : ['']
            avatar_img_name = avatar[0] !=='' ? avatar[0].slice(1,-2) : ''
            console.log(avatar_img_name);
            // console.log(elem);
            lang = elem.match(/,[ruen]{2},/)[0].trim().slice(1, -1)
            console.log(lang);
            let indexStartTitle, indexEndTitle
            indexStartTitle = elem.indexOf(elem.match(/,[ruen]{2},/)[0]) + 4
            indexEndTitle = indexStartTitle + elem.slice(indexStartTitle,).indexOf(elem.slice(indexStartTitle,).match(/,[A-ZА-ЯЁ0-9"«]{1}/))
            // console.log(indexStartTitle, indexEndTitle);
            title = elem.slice(indexStartTitle, indexEndTitle)
            if(title[0] === '"'){
                title = title.slice(1,)
            }
            if(title[title.length - 1] === '"'){
                title = title.trim().slice(0,title.length - 2)
            }
            // console.log('match', elem.slice(indexStartTitle, indexStartTitle + elem.slice(indexStartTitle,).indexOf(elem.slice(indexStartTitle,).match(/,[A-ZА-ЯЁ0-9"]{1}/))), elem.slice(indexStart,).match(/,[A-ZА-ЯЁ0-9"]{1}/))
            console.log('title', title);
            teaser = elem.slice(indexEndTitle, elem.lastIndexOf(',"<p') != -1 ?  elem.lastIndexOf(',"<p') :  elem.lastIndexOf(',"<div')).slice(1,)
            if(teaser[0] === '"'){
                teaser = teaser.slice(1,)
            }
            if(teaser[teaser.length - 1] === '"'){
                teaser = teaser.trim().slice(0,teaser.length - 2)
            }
            console.log('teaser', teaser);
            content = elem.slice(elem.indexOf(',"<p'), elem.lastIndexOf('</p>')).slice(2,)
            console.log('content', content) 
            order = elem.split(',')[elem.split(',').length - 2].slice(1,2)
            console.log('order',order);
            show_avatar = Number(elem.split(',')[elem.split(',').length - 1].trim())
            console.log('show_avatar',show_avatar);
            news_news = News.create({id, create_date, publicated, avatar_img_name, lang, title, teaser, content, order, show_avatar})
        })
        
        res.json({message: 'Data is imported in table news_news'})
    }



    async importDataPagesContent(req, res){
        let elementImported = []
        let pages_content 
        let id, page_id, lang, title, meta, content
        const dataImport = fs.readFileSync('./pages_content_202311091153.csv', 'utf-8')
        // console.log(dataImport);
        const deleteDataDB = dataImport.replace(`"id","page_id","lang","title","meta","content"`, '')
        const indexsStartOfNewElem = []
        const reg = new RegExp(`[0-9]{1,4},[0-9]{1,4},[enru]{2}`, 'g')
        const getSatrtElement = deleteDataDB.match(reg)
        // console.log(getSatrtElement);
        for(let i = 0; i< getSatrtElement.length; i++){
            indexsStartOfNewElem.push(deleteDataDB.indexOf(getSatrtElement[i]))
        }
        for(let j = 0; j < indexsStartOfNewElem.length - 1; j++){
            elementImported.push(deleteDataDB.slice(indexsStartOfNewElem[j], indexsStartOfNewElem[j + 1]))
        }
        console.log(elementImported.length)

        res.json({message: 'Data is imported in pages_content'})
    }
    
}

module.exports = new IportDataTable()