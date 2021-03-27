package com.example.eportfolio.service;

/*
@Repository("postgresUserBio")
public class PostgresUserBioService implements UserBioDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public PostgresUserBioService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public Optional<UserBio> getUserBioByID(UUID id) {
        final String sql = "SELECT * FROM users_bio WHERE user_uuid = ?";

        UserBio userBio = jdbcTemplate.queryForObject(
                sql,
                new Object[]{id},
                (resultSet, i) -> {
                    return new UserBio(
                            UUID.fromString(resultSet.getString("user_uuid")),
                            resultSet.getString("phone"),
                            resultSet.getString("address_main"),
                            resultSet.getString("address_city"),
                            resultSet.getString("address_zip"),
                            resultSet.getString("address_country"),
                            resultSet.getString("date_birth"),
                            resultSet.getString("gender")
                    );
                }
        );
        return Optional.ofNullable(userBio);
    }

    @Override
    public int updateUserBio(UUID id, UserBio userBio) {

        try {
            final String updateUserBioSQL = "UPDATE users_bio SET" +
                    " phone = '" + userBio.getPhone() +
                    "', address_main = '" + userBio.getAddress_main() +
                    "', address_city = '" + userBio.getAddress_city() +
                    "', address_country = '" + userBio.getAddress_country() +
                    "', address_zip = '" + userBio.getAddress_zip() +
                    "', gender = '" + userBio.getGender() +
                    "', date_birth = '" + userBio.getDate_birth() +
                    "' WHERE user_uuid = '" + userBio.getUserBioId() + "';";

            jdbcTemplate.execute(updateUserBioSQL);
            return 1;

        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Update user error.");
            return 0;
        }
    }

}*/
