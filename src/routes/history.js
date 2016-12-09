'use strict';

import Router from 'koa-router';
import NodeExcel from 'excel-export';
import  * as HistoryControllers from '../controllers/history'

const router = new Router();


router.get('/summary', async (ctx, next) => {
    await HistoryControllers.getAllHistoryThisMonth(ctx, next);
})

router.get('/export/uv', async (ctx, next) => {
    await HistoryControllers.exportUv(ctx, next);
})


router.get('/linechart', async (ctx, next) => {
     await HistoryControllers.getAllHistoryThisMonth(ctx, next);
})


export default router;