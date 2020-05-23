export const imageListColumn = [
  {
    title: "INDEX",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "IMAGE ID",
    dataIndex: "id",
    key: "id"
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "REPOSITORY",
    dataIndex: "repository",
    key: "repository"
  },
  {
    title: "TAG",
    dataIndex: "tag"
  },
  {
    title: "DESCRIPTION",
    dataIndex: "description"
  },
  {
    title: "OFFICIAL",
    dataIndex: "official",
    scopedSlots: { customRender: "official" }
  },
  {
    title: "STARS",
    dataIndex: "stars"
  },
  {
    title: "AUTOMATED",
    dataIndex: "automated",
    scopedSlots: { customRender: "automated" }
  },
  {
    title: "CREATED",
    dataIndex: "created",
    key: "created"
  },
  {
    title: "SIZE",
    dataIndex: "size",
    key: "size"
  }
];
