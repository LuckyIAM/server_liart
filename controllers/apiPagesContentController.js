let {PageContent} = require('../models/models')

const templateGetDataPage = (find_from_title) => {
    const dataPage = PageContent.findOne({
        where: {
            title: find_from_title
        }
    })
    return dataPage
}

class GetPageContent{
    async getPageLibraryAddress(req, res){
        const libraryAdress = await templateGetDataPage('Адрес и время работы РГБИ')

        res.json(libraryAdress)
    }
    async getPageContact(req, res){
        const contact = await templateGetDataPage('Контакты')
        
        res.json(contact)
    }
}

module.exports = new GetPageContent()
