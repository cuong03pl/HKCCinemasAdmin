export const formFields = {
  film: [
    {
      title: "Tên phim",
      id: "title",
      placeholder: "Nhập tên phim",
      isText: true,
    },
    {
      title: "Chi tiết phim",
      id: "detail",
      placeholder: "Nhập chi tiết phim",
      isText: true,
    },
    {
      title: "Tóm tắt phim",
      id: "synopsis",
      placeholder: "Nhập chi tiết phim",
      isText: true,
    },
    {
      title: "Độ tuổi giới hạn",
      id: "ageLimit",
      placeholder: "Nhập độ tuổi giới hạn",
      isText: true,
    },
    {
      title: "Thời gian phim ( phút )",
      id: "duration",
      placeholder: "Nhập thời gian phim",
      isText: true,
    },
    {
      title: "Quốc gia",
      id: "country",
      placeholder: "Nhập quốc gia",
      isText: true,
    },
    {
      title: "Đánh giá phim",
      id: "rating",
      placeholder: "Nhập đánh giá phim",
      isText: true,
    },
    {
      title: "Đạo diễn",
      id: "director",
      placeholder: "Nhập tên đạo diễn",
      isText: true,
    },
    {
      title: "Thời gian phát hành",
      id: "releaseDate",
      placeholder: "Nhập thời gian phát hành",
      isDate: true,
    },
    {
      title: "Thời gian kết thúc",
      id: "endDate",
      placeholder: "Nhập thời gian kết thúc",
      isDate: true,
    },
    // {id: "", placeholder: "", isHidden: true},
    {
      title: "Thể loại",
      id: "categoryIds",
      placeholder: "Chọn thể loại",
      isSelect: true,
    },
    {
      title: "Ảnh phim",
      id: "image",
      placeholder: "Nhập ảnh phim",
      isFile: true,
    },
    {
      title: "background",
      id: "background",
      placeholder: "Nhập background",
      isFile: true,
    },
  ],
  user: [
    {
      title: "Tài khoản",
      id: "userName",
      placeholder: "Nhập tài khoản",
      isText: true,
    },
    {
      title: "Email",
      id: "email",
      placeholder: "Nhập mật khẩu",
      isText: true,
    },
  ],
  cinemas: [
    { title: "Tên rạp", id: "name", placeholder: "Nhập tên rạp", isText: true },
    {
      title: "Địa chỉ rạp",
      id: "address",
      placeholder: "Nhập địa chỉ rạp",
      isText: true,
    },
    {
      title: "Thể loại",
      id: "cinemasCategoryId",
      placeholder: "Chọn thể loại",
      isSelectnotMuti: true,
    },
    {
      title: "Ảnh rạp",
      id: "image",
      placeholder: "Nhập ảnh rạp",
      isFile: true,
    },
    {
      title: "Background",
      id: "background",
      placeholder: "Nhập ảnh rạp",
      isFile: true,
    },
  ],
  cinemas_category: [
    { title: "Tên rạp", id: "name", placeholder: "Nhập tên rạp", isText: true },
    {
      title: "Ảnh rạp",
      id: "image",
      placeholder: "Nhập ảnh rạp",
      isFile: true,
    },
  ],
  actor: [
    {
      title: "Tên diễn viên",
      id: "name",
      placeholder: "Nhập tên diễn viên",
      isText: true,
    },
    { title: "Phim", id: "filmIds", placeholder: "Chọn phim", isSelect: true },
    {
      title: "Ảnh diễn viên",
      id: "image",
      placeholder: "Nhập ảnh diễn viên",
      isFile: true,
    },
  ],
  category: [
    {
      title: "Tên thể loại",
      id: "name",
      placeholder: "Nhập tên thể loại",
      isText: true,
    },
  ],
  trailer: [
    {
      title: "Link",
      id: "link",
      placeholder: "Nhập link trailer",
      isText: true,
    },
    {
      title: "Tên phim",
      id: "filmId",
      placeholder: "Tên phim",
      isSelectnotMuti: true,
    },
  ],
  room: [
    {
      title: "Tên phòng",
      id: "roomName",
      placeholder: "Nhập tên phòng",
      isText: true,
    },
    {
      title: "Rạp chiếu",
      id: "cinemasId",
      placeholder: "Nhập rạp chiếu",
      isSelectnotMuti: true,
    },
  ],
  seat: [
    {
      title: "Tên chỗ ngồi",
      id: "name",
      placeholder: "Nhập tên chỗ ngồi",
      isText: true,
    },

    {
      title: "Phòng chiếu",
      id: "roomID",
      placeholder: "Nhập rạp chiếu",
      isSelectnotMuti: true,
      isSeat: true,
    },
  ],
  showDate: [
    { title: "Ngày", id: "date", placeholder: "Nhập ngày", isDate: true },
    {
      title: "Rạp chiếu",
      id: "cinemasId",
      placeholder: "Nhập rạp chiếu",
      isSelectnotMuti: true,
    },
  ],
  schedule: [
    {
      title: "Thời gian bắt đầu",
      id: "startTime",
      placeholder: "Nhập thời gian bắt đầu",
      isTime: true,
    },

    {
      title: "Phim",
      id: "filmId",
      placeholder: "Nhập phim",
      isSelectnotMuti: true,
    },
    {
      title: "Rạp chiếu",
      id: "cinemasId",
      placeholder: "Nhập rạp chiếu",
      isSelectnotMuti: true,
      isChange: true,
    },
    {
      title: "Phòng",
      id: "roomId",
      placeholder: "Nhập phòng",
      isSelectnotMuti: true,
      isRoomId: true,
    },
    {
      title: "Ngày chiếu",
      id: "showDateId",
      placeholder: "Nhập ngày chiếu",
      isShowDateId: true,
      isSelectnotMuti: true,
    },
  ],
  ticket: [
    { title: "Giá vé", id: "price", placeholder: "Nhập giá vé", isText: true },
    {
      title: "Xuất chiếu",
      id: "scheduleId",
      placeholder: "Nhập xuất chiếu",
      isSelectnotMuti: true,
      isTicket: true,
    },
  ],
  role: [
    {
      title: "Tên role",
      id: "name",
      placeholder: "Nhập tên role",
      isText: true,
    },
  ],
  userRoles: [
    {
      title: "roles",
      id: "selectedUserRoles",
      placeholder: "Chọn roles",
      isSelect: true,
    },
  ],
  // ticket: [
  //   {
  //     title: "Người dùng",
  //     id: "userName",
  //     placeholder: "Nhập người dùng",
  //     isText: true,
  //   },
  //   {
  //     title: "Tên phim",
  //     id: "filmName",
  //     placeholder: "Nhập tên phim",
  //     isText: true,
  //   },
  //   {
  //     title: "Giá vé",
  //     id: "price",
  //     placeholder: "Nhập giá vé",
  //     isText: true,
  //   },
  //   {
  //     title: "Rạp chiếu",
  //     id: "cinemas",
  //     placeholder: "Nhập rạp chiếu",
  //     isText: true,
  //   },
  //   {
  //     title: "Chỗ ngồi",
  //     id: "seat",
  //     placeholder: "Nhập chỗ ngồi",
  //     isText: true,
  //   },
  //   {
  //     title: "Phòng chiếu",
  //     id: "room",
  //     placeholder: "Nhập phòng chiếu",
  //     isText: true,
  //   },
  //   {
  //     title: "Ngày chiếu",
  //     id: "showdate",
  //     placeholder: "Nhập ngày chiếu",
  //     isText: true,
  //   },
  //   {
  //     title: "Thời gian bắt đầu",
  //     id: "starttime",
  //     placeholder: "Nhập thời gian bắt đầu",
  //     isText: true,
  //   },
  //   {
  //     title: "Thời gian kết thúc",
  //     id: "endtime",
  //     placeholder: "Nhập thời gian kết thúc",
  //     isText: true,
  //   },
  // ],
};
