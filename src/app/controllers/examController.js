//IMPORTS
const ObjectId = require('mongoose').Types.ObjectId;
//MODELS
const Exam = require("../models/examModel");
const Lab = require("../models/labModel");
//
class ExamController {
    //
    async update(req, res) {
        if (Array.isArray(req.body)) {
            //
            if (req.body.length <= 0) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
            //
            const async = require("async");
            async.eachSeries(req.body, function updateObject(obj, done) {
                if (!ObjectId.isValid(obj.id)) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
                //
                try {
                    Exam.updateOne({ _id: obj.id }, { $set: obj }, done);
                } catch {
                    return res.status(500).send({ error: '011', message: 'Algum registro não condiz com o esperado.' });
                }
                //
            }, function allDone(err) {
                if (err) return res.status(500).send({ error: '012', message: 'Algo deu errado.' });
                //
                return res.status(200).send({ error: '', message: 'Registros atualizados.' });
            });
        } else {
            const _id = req.body.id;
            //
            if (!_id && !ObjectId.isValid(_id)) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
            //
            try {
                await Exam.findOneAndUpdate({ _id }, { $set: req.body }, { upsert: false }, function (err, doc) {
                    if (err) return res.status(500).send({ error: '001', message: 'Algo deu errado.' });
                    //
                    return res.status(200).send('Registro atualizado.');
                });
            } catch {
                return res.status(500).send({ error: '002', message: 'Não conseguimos atualizar o registro.' });
            }
        }
    }
    //
    async store(req, res) {
        if (Array.isArray(req.body)) {
            //
            if (req.body.length <= 0) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
            //
            try {
                await Exam.insertMany(
                    req.body,
                    function (err) {
                        if (err) return res.status(500).send({ error: '011', message: 'Algo deu errado.' });
                        //
                        return res.status(200).send({ error: '', message: 'Registrados com sucesso.' });
                    }
                );
            } catch {
                return res.status(500).send({ error: '012', message: 'Não foi possível gravar os registros.' });
            }
        } else {
            const { name, type } = req.body;
            if (!name || !type) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
            //
            try {
                await Exam.create({ name, type }, function (err, doc) {
                    if (err) return res.status(500).send({ error: '001', message: 'Algo deu errado.' });
                    //
                    return res.status(200).send({ message: '', error: '', message: 'Registrado com sucesso.' });
                });
            } catch {
                return res.status(500).send({ message: '', error: '002', message: 'Não foi possível gravar o registro.' });
            }
        }
    }
    //
    async index(req, res) {
        try {
            await Exam.find({ deleted: false }, function (err, doc) {
                if (err) return res.status(500).send({ error: '001', message: 'Algo deu errado.' });
                //
                return res.status(200).send({ message: '', error: '', data: doc });
            });
        } catch {
            return res.status(500).send({ error: '002', message: 'Não foi possível resgatar os registros.' });
        }
    }
    //
    async get(req, res) {
        const { id } = req.body;
        //
        if (!id) return res.status(400).send({ message: 'Algum parametro não foi fornecido.', error: 'request_error' });
        //
        try {
            await Exam.findOne({
                $and:
                    [
                        { _id: id },
                        { deleted: false }
                    ]
            }, function (err, doc) {
                if (err) return res.status(500).send({ error: '001', message: 'Algo deu errado.' });
                //
                return res.status(200).send({ error: '', message: '', data: doc });
            });
        } catch {
            return res.status(500).send({ error: '002', message: 'Não conseguimos resgatar o registro.' });
        }
    }
    //
    async delete(req, res) {
        if (Array.isArray(req.body)) {
            //
            if (req.body.length <= 0) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
            //
            try {
                await Exam.deleteMany({
                    _id: {
                        $in: req.body
                    }
                }, function (error) {
                    if (error) return res.status(500).send({ error: '011', message: 'Algo deu errado.' });
                    //
                    return res.status(200).send({ error: '', message: 'Registros removidos.' });
                });
            } catch {
                return res.status(500).send({ error: '012', message: 'Não conseguimos remover os registros.' });
            }
        } else {
            const _id = req.body.id;
            //
            if (!_id && !ObjectId.isValid(_id)) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
            //
            try {
                await Exam.delete({ _id }, function (error) {
                    if (error) return res.status(500).send({ error: '001', message: 'Algo deu errado.' });
                    //
                    return res.status(200).send({ error: '', message: 'Registro removido.' });
                });
            } catch {
                return res.status(500).send({ error: '002', message: 'Não conseguimos remover o registro.' });
            }
        }
    }
    //
    async restore(req, res) {
        const _id = req.body.id;
        //
        if (!_id && !ObjectId.isValid(_id)) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
        //
        try {
            await Exam.restore({ _id }, function (error) {
                if (error) return res.status(500).send({ error: '001', message: 'Algo deu errado.' });
                //
                return res.status(200).send({ error: '', message: 'Registro devolvido.' });
            });
        } catch {
            return res.status(500).send({ error: '002', message: 'Não conseguimos restaurar o registro.' });
        }
    }
    //
    async associate(req, res) {
        const { examId, labId } = req.body;
        //
        if ((!examId && !ObjectId.isValid(examId)) || (!labId && !ObjectId.isValid(labId)))
            return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
        //
        try {
            await Exam.findOne({
                $and:
                    [
                        { _id: examId },
                        { deleted: false }
                    ]
            }, function (err) {
                if (err) return res.status(404).send({ error: '001', message: 'Não encontramos o exame informado.' });
            });
        } catch {
            return res.status(500).send({ error: '002', message: 'Algo deu errado ao procurar o exame.' });
        }
        //
        try {
            await Lab.findOneAndUpdate(
                { _id: labId, deleted: false },
                { $addToSet: { exams: examId } },
                { upsert: false },
                function (err, doc) {
                    if (err) return res.status(500).send({ error: '003', message: 'Não foi possível associar os registros.' });
                    //
                    return res.status(200).send({ error: '', message: 'Registros associados.' });
                });
        } catch {
            return res.status(500).send({ error: '004', message: 'Algo deu errado ao associar os registros.' });
        }
    }
    //
    async desassociate(req, res) {
        const { examId, labId } = req.body;
        //
        if ((!examId && !ObjectId.isValid(examId)) || (!labId && !ObjectId.isValid(labId)))
            return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
        //
        try {
            await Exam.findOne({
                $and:
                    [
                        { _id: examId },
                        { deleted: false }
                    ]
            }, function (err) {
                if (err) return res.status(404).send({ error: '001', message: 'Não encontramos o exame informado.' });
            });
        } catch {
            return res.status(500).send({ error: '002', message: 'Algo deu errado ao procurar o exame.' });
        }
        //
        try {
            await Lab.findOneAndUpdate(
                { _id: labId, deleted: false },
                { $pull: { exams: examId } },
                { upsert: false },
                function (err, doc) {
                    if (err) return res.status(500).send({ error: '003', message: 'Algo deu errado.' });
                    //
                    return res.status(200).send({ error: '', message: 'Registros desassociados.' });
                });
        } catch {
            return res.status(500).send({ error: '004', message: 'Algo deu errado ao desassociar os registros.' });
        }
    }
    //
    async searchLab(req, res) {
        const name = req.body.name;
        //
        if (!name) return res.status(400).send({ error: 'request_error', message: 'Algum parametro não foi fornecido.' });
        //
        try {
            await Exam.findOne({
                $and:
                    [
                        { name },
                        { deleted: false }
                    ]
            }, async function (err, doc) {
                //
                if (err) return res.status(500).send({ error: '001', message: 'Não encontramos o exame informado.' });
                //
                const data = await Lab.find({ deleted: false, exams: doc.id })
                    .populate('exams')
                    .exec(function (err, doc) {
                        if (err) return res.status(500).send({ error: '002', message: 'Algo deu errado.' });
                        //
                        return res.status(200).send({ error: '', message: '', data: doc });
                    });
            });
        } catch {
            return res.status(500).send({ error: '003', message: 'Não conseguimos fazer a busca.' });
        }
    }
}
//
module.exports = new ExamController();