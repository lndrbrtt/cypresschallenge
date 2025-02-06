const Ajv = require("ajv");
const avj = new Ajv();

describe("Backend Validations", () => {
  const baseUrl = "https://serverest.dev"; // Replace with your actual API base URL
  let userId;

  it("GET /usuarios - Listar usuários cadastrados", () => {
    cy.request("GET", `${baseUrl}/usuarios`).then((response) => {
      expect(response.status).to.eq(200);
      cy.fixture("getUserSchema.json").then((jsonData) => {
        const schema = jsonData;
        const validate = avj.compile(schema);
        const isvalid = validate(response.body);
        expect(isvalid).to.be.true;
      });
    });
  });

  it("POST /usuarios - Cadastrar usuário", () => {
    cy.fixture("postUserBody.json").then((jsonData) => {
      const newUser = jsonData;
      cy.request("POST", `${baseUrl}/usuarios`, newUser).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("_id");
        userId = response.body._id;
        cy.log(userId)
      });
    });
  });

  it("DELETE /usuarios/{_id} - Excluir usuário", () => {
    cy.request("DELETE", `${baseUrl}/usuarios/${userId}`).then((response) => {
      expect(response.status).to.eq(200); // Assuming 200 for successful deletion
    });
  });
});
