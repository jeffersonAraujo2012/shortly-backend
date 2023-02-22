export default async function signin(req, res) {
  //Caso o usuário/senha não seja compatível (ou não exista), retornar o status code `401`.
  res.status(200).send({ token: 'MEUTOKEN' });
}
