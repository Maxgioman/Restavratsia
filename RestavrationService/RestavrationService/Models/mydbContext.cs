using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace RestavrationService.Models
{
    public partial class mydbContext : DbContext
    {
        public mydbContext()
        {
        }

        public mydbContext(DbContextOptions<mydbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Company> Company { get; set; }
        public virtual DbSet<CompanyReview> CompanyReview { get; set; }
        public virtual DbSet<Companyspecialization> Companyspecialization { get; set; }
        public virtual DbSet<Custom> Custom { get; set; }
        public virtual DbSet<Customcompany> Customcompany { get; set; }
        public virtual DbSet<Specialization> Specialization { get; set; }
        public virtual DbSet<User> User { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;port=3306;database=mydb;username=root;password=root", x => x.ServerVersion("8.0.19-mysql"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Company>(entity =>
            {
                entity.ToTable("company");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .HasColumnName("email")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("text")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Login)
                    .HasColumnName("login")
                    .HasColumnType("varchar(25)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Name)
                    .HasColumnName("name")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Pass)
                    .HasColumnName("pass")
                    .HasColumnType("varchar(10)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Phone)
                    .HasColumnName("phone")
                    .HasColumnType("varchar(13)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Surname)
                    .HasColumnName("surname")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
            });

            modelBuilder.Entity<CompanyReview>(entity =>
            {
                entity.ToTable("company_review");

                entity.HasIndex(e => e.CompanyId)
                    .HasName("company_id_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("user_id_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.Date)
                    .HasColumnName("date")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasColumnName("description")
                    .HasColumnType("text")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Grade).HasColumnName("grade");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.CompanyReview)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("company_id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.CompanyReview)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("userreview_id");
            });

            modelBuilder.Entity<Companyspecialization>(entity =>
            {
                entity.ToTable("companyspecialization");

                entity.HasIndex(e => e.Companyid)
                    .HasName("companyId");

                entity.HasIndex(e => e.Specialization)
                    .HasName("specialization");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Companyid).HasColumnName("companyid");

                entity.Property(e => e.Specialization)
                    .IsRequired()
                    .HasColumnName("specialization")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Companyspecialization)
                    .HasForeignKey(d => d.Companyid)
                    .HasConstraintName("companyId");

                entity.HasOne(d => d.SpecializationNavigation)
                    .WithMany(p => p.Companyspecialization)
                    .HasForeignKey(d => d.Specialization)
                    .HasConstraintName("specialization");
            });

            modelBuilder.Entity<Custom>(entity =>
            {
                entity.ToTable("custom");

                entity.HasIndex(e => e.FinalCompanyId)
                    .HasName("final_company_idx");

                entity.HasIndex(e => e.UserId)
                    .HasName("user_id_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CheckedByModer).HasColumnName("checked_by_moder");

                entity.Property(e => e.DateOfOrder)
                    .HasColumnName("date_of_order")
                    .HasColumnType("date");

                entity.Property(e => e.Description)
                    .HasColumnName("description")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.FinalCompanyId).HasColumnName("final_company_id");

                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasColumnName("title")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.FinalCompany)
                    .WithMany(p => p.Custom)
                    .HasForeignKey(d => d.FinalCompanyId)
                    .HasConstraintName("final_company");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Custom)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("user_id");
            });

            modelBuilder.Entity<Customcompany>(entity =>
            {
                entity.ToTable("customcompany");

                entity.HasIndex(e => e.CompanyId)
                    .HasName("companycustom_idx");

                entity.HasIndex(e => e.CustomId)
                    .HasName("custom_id_idx");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.CompanyId).HasColumnName("company_id");

                entity.Property(e => e.CustomId).HasColumnName("custom_id");

                entity.Property(e => e.PriceForWork).HasColumnName("price_for_work");

                entity.HasOne(d => d.Company)
                    .WithMany(p => p.Customcompany)
                    .HasForeignKey(d => d.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("companycustom");

                entity.HasOne(d => d.Custom)
                    .WithMany(p => p.Customcompany)
                    .HasForeignKey(d => d.CustomId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("custom_id");
            });

            modelBuilder.Entity<Specialization>(entity =>
            {
                entity.HasKey(e => e.Specialization1)
                    .HasName("PRIMARY");

                entity.ToTable("specialization");

                entity.Property(e => e.Specialization1)
                    .HasColumnName("specialization")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("user");

                entity.HasIndex(e => e.Login)
                    .HasName("login_UNIQUE")
                    .IsUnique();

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasColumnName("email")
                    .HasColumnType("varchar(45)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Image)
                    .HasColumnName("image")
                    .HasColumnType("text")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Login)
                    .IsRequired()
                    .HasColumnName("login")
                    .HasColumnType("varchar(25)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Name)
                    .IsRequired()
                    .HasColumnName("name")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Pass)
                    .IsRequired()
                    .HasColumnName("pass")
                    .HasColumnType("varchar(10)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Phone)
                    .IsRequired()
                    .HasColumnName("phone")
                    .HasColumnType("varchar(13)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");

                entity.Property(e => e.Surname)
                    .IsRequired()
                    .HasColumnName("surname")
                    .HasColumnType("varchar(30)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_0900_ai_ci");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
