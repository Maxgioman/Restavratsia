using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace restavratsia1.Migrations
{
    public partial class identityId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_company_review_company1",
                table: "company_review");

            migrationBuilder.DropForeignKey(
                name: "final_company_id",
                table: "custom");

            migrationBuilder.DropForeignKey(
                name: "fk_Company_company_id",
                table: "customcompany");

            migrationBuilder.DropForeignKey(
                name: "fk_User_user_id",
                table: "customcompany");

            migrationBuilder.DropTable(
                name: "company_has_specialization");

            migrationBuilder.DropTable(
                name: "company");

            migrationBuilder.DropTable(
                name: "specialization");

            migrationBuilder.DropColumn(
                name: "surname",
                table: "user");

            migrationBuilder.DropColumn(
                name: "description",
                table: "company_review");

            migrationBuilder.DropColumn(
                name: "title",
                table: "company_review");

            migrationBuilder.RenameIndex(
                name: "user_id_idx",
                table: "customcompany",
                newName: "fk_customcompany_custom1_idx");

            migrationBuilder.RenameIndex(
                name: "company_id_idx",
                table: "customcompany",
                newName: "fk_customcompany_user1_idx");

            migrationBuilder.RenameIndex(
                name: "final_company_id_idx",
                table: "custom",
                newName: "fk_custom_user1_idx");

            migrationBuilder.RenameIndex(
                name: "fk_company_review_company1_idx",
                table: "company_review",
                newName: "fk_company_review_user2_idx");

            migrationBuilder.AlterColumn<string>(
                name: "pass",
                table: "user",
                type: "varchar(25)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "user",
                type: "varchar(40)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(30)")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "login",
                table: "user",
                type: "varchar(20)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(25)")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "varchar(40)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(45)",
                oldMaxLength: 256)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<sbyte>(
                name: "isCompany",
                table: "user",
                nullable: false,
                defaultValue: (sbyte)0);

            migrationBuilder.AlterColumn<string>(
                name: "company_id",
                table: "customcompany",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "final_company_id",
                table: "custom",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "custom",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "image",
                table: "custom",
                type: "text",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "specialization_specialization",
                table: "custom",
                type: "varchar(30)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "grade",
                table: "company_review",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "company_id",
                table: "company_review",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "review",
                table: "company_review",
                type: "text",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AddForeignKey(
                name: "fk_company_review_user2",
                table: "company_review",
                column: "company_id",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_custom_user1",
                table: "custom",
                column: "final_company_id",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_customcompany_user1",
                table: "customcompany",
                column: "company_id",
                principalTable: "user",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "fk_customcompany_custom1",
                table: "customcompany",
                column: "custom_id",
                principalTable: "custom",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_company_review_user2",
                table: "company_review");

            migrationBuilder.DropForeignKey(
                name: "fk_custom_user1",
                table: "custom");

            migrationBuilder.DropForeignKey(
                name: "fk_customcompany_user1",
                table: "customcompany");

            migrationBuilder.DropForeignKey(
                name: "fk_customcompany_custom1",
                table: "customcompany");

            migrationBuilder.DropColumn(
                name: "isCompany",
                table: "user");

            migrationBuilder.DropColumn(
                name: "image",
                table: "custom");

            migrationBuilder.DropColumn(
                name: "specialization_specialization",
                table: "custom");

            migrationBuilder.DropColumn(
                name: "review",
                table: "company_review");

            migrationBuilder.RenameIndex(
                name: "fk_customcompany_custom1_idx",
                table: "customcompany",
                newName: "user_id_idx");

            migrationBuilder.RenameIndex(
                name: "fk_customcompany_user1_idx",
                table: "customcompany",
                newName: "company_id_idx");

            migrationBuilder.RenameIndex(
                name: "fk_custom_user1_idx",
                table: "custom",
                newName: "final_company_id_idx");

            migrationBuilder.RenameIndex(
                name: "fk_company_review_user2_idx",
                table: "company_review",
                newName: "fk_company_review_company1_idx");

            migrationBuilder.AlterColumn<string>(
                name: "pass",
                table: "user",
                type: "varchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(25)")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "user",
                type: "varchar(30)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(40)")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "login",
                table: "user",
                type: "varchar(25)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(20)")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<string>(
                name: "email",
                table: "user",
                type: "varchar(45)",
                maxLength: 256,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(40)",
                oldMaxLength: 256)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "surname",
                table: "user",
                type: "varchar(30)",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "company_id",
                table: "customcompany",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "final_company_id",
                table: "custom",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "custom",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci")
                .OldAnnotation("MySql:CharSet", "utf8")
                .OldAnnotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AlterColumn<int>(
                name: "grade",
                table: "company_review",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "company_id",
                table: "company_review",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "description",
                table: "company_review",
                type: "text",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.AddColumn<string>(
                name: "title",
                table: "company_review",
                type: "varchar(45)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8")
                .Annotation("MySql:Collation", "utf8_general_ci");

            migrationBuilder.CreateTable(
                name: "company",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    email = table.Column<string>(type: "varchar(30)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci"),
                    image = table.Column<string>(type: "text", nullable: true)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci"),
                    login = table.Column<string>(type: "varchar(25)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci"),
                    name = table.Column<string>(type: "varchar(45)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci"),
                    pass = table.Column<string>(type: "varchar(10)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci"),
                    phone = table.Column<string>(type: "varchar(13)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_company", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "specialization",
                columns: table => new
                {
                    specialization = table.Column<string>(type: "varchar(30)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.specialization);
                });

            migrationBuilder.CreateTable(
                name: "company_has_specialization",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    company_id = table.Column<int>(type: "int", nullable: false),
                    specialization_specialization = table.Column<string>(type: "varchar(30)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8")
                        .Annotation("MySql:Collation", "utf8_general_ci")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_company_has_specialization", x => x.Id);
                    table.ForeignKey(
                        name: "fk_company_has_specialization_company1",
                        column: x => x.company_id,
                        principalTable: "company",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "fk_company_has_specialization_specialization1",
                        column: x => x.specialization_specialization,
                        principalTable: "specialization",
                        principalColumn: "specialization",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "fk_company_has_specialization_company1_idx",
                table: "company_has_specialization",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "fk_company_has_specialization_specialization1_idx",
                table: "company_has_specialization",
                column: "specialization_specialization");

            migrationBuilder.AddForeignKey(
                name: "fk_company_review_company1",
                table: "company_review",
                column: "company_id",
                principalTable: "company",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "final_company_id",
                table: "custom",
                column: "final_company_id",
                principalTable: "company",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_Company_company_id",
                table: "customcompany",
                column: "company_id",
                principalTable: "company",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_User_user_id",
                table: "customcompany",
                column: "custom_id",
                principalTable: "custom",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
