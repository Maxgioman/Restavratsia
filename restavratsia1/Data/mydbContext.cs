using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace restavratsia1.Models
{
    public partial class mydbContext : IdentityDbContext<User>
    {
        public mydbContext()
        {
        }

        public mydbContext(DbContextOptions<mydbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<CompanyReview> CompanyReview { get; set; }
        public virtual DbSet<Custom> Custom { get; set; }
        public virtual DbSet<Customcompany> Customcompany { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;port=3306;database=mydb;username=root;password=leomessi1021", x => x.ServerVersion("8.0.19-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<CompanyReview>(entity =>
            {
                entity.ToTable("company_review");

                entity.HasIndex(e => e.CompanyId)
                    .HasName("fk_company_review_user2_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("fk_company_review_user1_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Grade).HasColumnName("grade");

                entity.Property(e => e.Review)
                    .IsRequired()
                    .HasColumnName("review")
                    .HasColumnType("text")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyReviewCompany)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_company_review_user2");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CompanyReviewUser)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_company_review_user1");
            });

            modelBuilder.Entity<Custom>(entity =>
            {
                entity.ToTable("custom");

                entity.HasIndex(e => e.FinalCompanyId)
                    .HasName("fk_custom_user1_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("user_id_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CheckedByModer)
                    .HasColumnName("checked_by_moder")
                    .HasColumnType("tinyint(3) unsigned zerofill");

                entity.Property(e => e.DateOfOrder)
                    .HasColumnName("date_of_order")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasColumnType("text")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.FinalCompanyId).HasColumnName("final_company_id");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("text")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.SpecializationSpecialization)
                    .IsRequired()
                    .HasColumnName("specialization_specialization")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.FinalCompany)
                    .WithMany(p => p.CustomFinalCompany)
                    .HasForeignKey(d => d.FinalCompanyId)
                    .HasConstraintName("fk_custom_user1");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CustomUser)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("user_id");
            });

            modelBuilder.Entity<Customcompany>(entity =>
            {
                entity.ToTable("customcompany");

                entity.HasIndex(e => e.CompanyId)
                    .HasName("fk_customcompany_user1_idx");

                entity.HasIndex(e => e.CustomId)
                    .HasName("fk_customcompany_custom1_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.CustomId).HasColumnName("custom_id");

                entity.Property(e => e.PriceForWork).HasColumnName("price_for_work");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Customcompany)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_customcompany_user1");

                entity.HasOne(d => d.Custom)
                    .WithMany(p => p.Customcompany)
                    .HasForeignKey(d => d.CustomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("fk_customcompany_custom1");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(40)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("text")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.IsCompany).HasColumnName("isCompany");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasColumnName("login")
                    .HasColumnType("varchar(20)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(40)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Pass)
                    .IsRequired()
                    .HasColumnName("pass")
                    .HasColumnType("varchar(25)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");

                entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasColumnType("varchar(13)")
                    .HasCharSet("utf8")
                    .HasCollation("utf8_general_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
