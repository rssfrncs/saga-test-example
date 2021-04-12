import { runSaga } from "redux-saga";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { rootSaga } from ".";

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts", (req, res, ctx) =>
    res(
      ctx.json([
        {
          userId: 10,
          id: 92,
          title: "ratione ex tenetur perferendis",
          body: "body",
        },
      ])
    )
  )
);

describe("saga test", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("default", async () => {
    const dispatched = [];
    await runSaga(
      {
        dispatch: (event) => dispatched.push(event),
      },
      rootSaga
    ).toPromise();
    expect(dispatched).toHaveLength(1);
  });
});
