'use strict'
import PromiseFtp from 'promise-ftp'
import log4js from 'log4js'
import {touch, rm, isDir} from '../helpers/files'
import {transformUrlIntoArrayPath} from '../helpers/regex'
import {takeLastValueOfArray, removeLasValueOfArray} from '../helpers/functions'
import * as P from 'bluebird'

const LOG = log4js.getLogger('file')


export const connectToFtp = (ctx, next, message = false) => {
    const host = ctx.request.body.host
    const user = ctx.request.body.user
    const password = ctx.request.body.password
    const root = ctx.request.body.root
    const ftp = new PromiseFtp();

    return ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
        .then(serverMessage => {
            console.log('Server message: ', serverMessage)
            console.log(root)
            return ftp.list(root)
        })
        .then(list => {
            console.log('Directory listing: ', list);
            ctx.body = {
                status: 200,
                list,
                root,
                message: (message) ? message : 'Connection success',
            }
            return ftp.end();
        })
        .catch(ex => {
            console.log('Error: ', ex)
            ctx.body = {
                status: 400,
                list: [],
                root: '',
                message: 'Error conection'
            }
        })
}

export const removeFileOrDirectory = async(ctx, next) => {

    const host = ctx.request.body.host
    const user = ctx.request.body.user
    const password = ctx.request.body.password
    const root = ctx.request.body.root
    const ftp = new PromiseFtp()

    ftp.connect({host: host, user: user, password: password})
        .then(function (serverMessage) {
            if (isDir(takeLastValueOfArray(transformUrlIntoArrayPath(root)))) {
                return ftp.rmdir(root, true)
            } else {
                return ftp.delete(root)
            }
        })
        .then(function () {
            return ftp.end()
        })

    const pathInFtp = '/' + removeLasValueOfArray(transformUrlIntoArrayPath(root)).join('/')


    ctx.body = {
        status: (root) ? 200 : 500,
        root: pathInFtp,
        message: (root) ? 'Delete success' : 'Delete error'
    }
}

export const createFileOrDirectory = async(ctx, next) => {

    const nameFileOrDir = ctx.request.body.newDirOrFile

    if (nameFileOrDir.length <= 0) {
        ctx.body = {
            status: 400,
            root: root,
            message: 'Error no pass name'
        }
    }

    const pathInFtp = (!isDir(nameFileOrDir)) ? await createFile(ctx, next) : await createFile(ctx, next)

    ctx.body = {
        status: (pathInFtp) ? 200 : 500,
        root: pathInFtp,
        message: (pathInFtp) ? 'Create success' : 'Create error'
    }

}

const createDir = (ctx, next) => {

    const nameDir = ctx.request.body.newDirOrFile
    const host = ctx.request.body.host
    const user = ctx.request.body.user
    const password = ctx.request.body.password
    const root = ctx.request.body.root
    const ftp = new PromiseFtp()
    const pathPromise = root + '/' + nameDir

    const createPromise = ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
        .then(serverMessage => {
            return ftp.mkdir(root + '/' + nameDir)
        })
        .then(_ => {
            return ftp.end()
        })
        .catch(err => {
            throw err
        })

    return Promise.all([pathPromise, createPromise])
        .then(values => {
            return values[0] //pathPromise
        })
        .catch(reason => {
            console.error(reason)
        })

}

const createFile = async(ctx, next) => {

    const nameFile = ctx.request.body.newDirOrFile
    const touchPromise = touch('src/tmp/' + nameFile)
    const uploadPromise = uploadToFtp(ctx, next, 'src/tmp/' + nameFile)
    const pathPromise = ctx.request.body.root + '/' + nameFile
    const rmPromise = rm('src/tmp/' + nameFile)

    return Promise.all([pathPromise, touchPromise, uploadPromise, rmPromise])
        .then(values => {
            return values[0] //pathPromise
        })
        .catch(reason => {
            console.error(reason)
        })
}


export const uploadToFtp = (ctx, next, rootLocalFile = false) => {

    const host = ctx.request.body.host
    const user = ctx.request.body.user
    const password = ctx.request.body.password
    const root = ctx.request.body.root
    const ftp = new PromiseFtp()
    const rootFile = rootLocalFile // when no nameFile upload the file in ctx ... no implement yet
    const pathInFtp = root + '/' + takeLastValueOfArray(transformUrlIntoArrayPath(rootFile))

    return ftp.connect({host: host, user: user, password: password, connTimeout: 40000})
        .then(serverMessage => {
            return ftp.put(rootFile, pathInFtp)
        })
        .then(_ => {
            return ftp.end()
        })
        .catch(err => {
            throw err
        })

}
