'use strict'
import log4js from 'log4js'
import History from '../models/ftpHistory'
import NodeExcel from 'excel-export';

export const getAllHistoryThisMonth = async (ctx, next) => {

    const userId = ctx.req.user.dataValues.id
    const historyOfThisMonth = await History.getAllForThisMonth(userId)
    
    ctx.body = {
        'status' : 200,
        'data' : {
            'history' : historyOfThisMonth,
        }
    }

}

export const exportUv = async (ctx, next) => {

    const userId = ctx.req.user.dataValues.id
    const historyOfThisMonth = await History.getAllForThisMonth(userId)
    
    let conf = {}
    conf.cols = [
        {
        caption:'Root',
        type:'string',
        width: 1000
        },
        {
        caption:'Date',
        type:'string',
        width: 300
        },
        {
        caption:'Action',
        type:'string',
        width: 300
        },
        {
        caption:'Host',
        type:'string',
        width: 500
        },
        {
        caption:'User',
        type:'string',
        width: 300
        },
    ]

    conf.rows = []
    historyOfThisMonth.map( instance => {
        const { root, date, action, host, user } = instance
        conf.rows = conf.rows.concat([[root, date, action, host, user]])
    })
    
    ctx.type = 'application/vnd.openxmlformats'
    ctx.attachment( "Report.xlsx")
    ctx.body = new Buffer(NodeExcel.execute(conf), 'binary')
}